'use strict';

import mysql from 'mysql';
import {getDBConn} from '../config'

const getConn = () => {
    let conn = mysql.createConnection(getDBConn());
    conn.connect();
    return conn;
}

const endConn = conn => {
    conn.end();
}

const dbQuery = (sql, callback) => {
    let conn = getConn();
    let row = null;
    console.log(conn);
    conn.query(sql, (err,rows,fields) => {
        if(!err){
            row = rows;
        }
        callback(row);
    });
    endConn(conn);
}

const executeQuery = (sql, callback) => {
    let conn = getConn();
    let row = false;
    conn.query(sql, (err,rows,fields) => {
        callback(!err);
    });
    endConn(conn);
}

module.exports = {
    dbQuery,
    executeQuery
}
