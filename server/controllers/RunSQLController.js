'use strict'

let runSQL = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, description: "gagaga" }));
}

let execute = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, description: "test" }));
}

module.exports = {
    runSQL,
    execute
}
