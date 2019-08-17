require('dotenv').config()
const mysql = require('mysql')

const conn = mysql.createConnection({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME
  host: 'remotemysql.com',
  user: '3mlmAeciot',
  password: 'iiVSOuLhD7',
  database: '3mlmAeciot'
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }
  console.log('terkonek DB')
})

module.exports = conn
