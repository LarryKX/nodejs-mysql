'use strict';

var request = require('request');

let getData = (req, res) => {
    let { thing_id, from, to } = req.query;
    //console.log(to);
    let body = {
        "query":{
            "bool":{
                "must":[{
                    "term":{"thing_id.keyword":thing_id}
                },{
                    "range":{
                        "connection.since": {"gt": from, "lt": to}
                    }
                }],
                "must_not":[],
                "should":[]
            }
        },
        "size":5000,
        "sort":[]
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    request({
        url: 'http://localhost:9200/soda-ginkgo-revise/_search',
        method: 'POST',
        json: true,
        body
    }, (error, response, body) => {
        //console.log(response.body);
        res.end(JSON.stringify(body));
    })
    //res.end(JSON.stringify({ success: true, description: "hahaha" }));
}


module.exports = {
    getData
}
