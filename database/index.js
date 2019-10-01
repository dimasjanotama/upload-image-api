const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'pictures',
    host: 'localhost'
})

module.exports = db