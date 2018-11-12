'use strict';

let repodb = {
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'mon',
    port : 44444
}

exports.getDBConn = () => {
    return repodb;
}

exports.jwtStr = "WANGYU";

exports.AuthUrl = ["/v1/user/auth"];
