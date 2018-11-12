'use strict';

let getData = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, description: "hahaha" }));
}


module.exports = {
    getData
}
