const http = require('http');
const {usersController} = require('../users/users-router');

let cors = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return true
    }
    return false
}
let server = http.createServer((req, res) => {
    if (cors(req, res)) return
    switch (req.url) {
        case"/":
            res.write("HOME")
            res.end()
            break
        case"/users":
            usersController(req, res)
            break
        default:
            res.write("PAGE NOT FOUND")
            res.end()

    }
    // res.end()
})


server.listen(4000)
// console.log(http)
// node --inspect withoutExpress.js
