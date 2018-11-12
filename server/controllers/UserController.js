'use strict';

import jwt from 'jwt-simple';
import moment from 'moment';
import {jwtStr} from '../config';
import {dbQuery,executeQuery} from '../records/DBConn';

let getAuth = (req, res) => {
    let {userid, password } = req.swagger.params.body.value;
    let resultHandler = list => {
        if(list && list.length){
            let expires = moment().add(4, 'h').valueOf();
            let token = jwt.encode({iss:userid, exp: expires},jwtStr);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({token, id: userid, expires }));
        } else {
            res.send(403);
        }
    }
    auth(userid, password, resultHandler);
}

let register = (req, res) => {
    let {userid, password } = req.swagger.params.body.value;
    let addCallback = success => {
        if(success) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({userid, password }));
        } else {
            res.send(403);
        }
    }
    addUser(userid, password, addCallback);
}

let auth = ( id , password, callback ) => {
    let sql = `select * from mon.users where id = '${id}' and pwd = '${password}'`;
    let result = dbQuery(sql , callback);
}

let validate = (id , password) => true;

let addUser = (id , password, callback) => {
    let sql = `insert into mon.users (id, pwd) values ('${id}','${password}')`;
    validate(id, password);
    executeQuery(sql, callback);
}

module.exports = {
    getAuth,
    register
}
