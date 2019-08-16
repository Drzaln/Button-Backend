const conn = require('../connection/connect')
module.exports = {
  getPattern: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM pattern', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getPatternActive: () => {
    const status = 1
    return new Promise((resolve, reject) => {
      conn.query(
        'SELECT * FROM pattern WHERE status = ?',
        status,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  insertPattern: data => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO pattern SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePatternActive: id_pattern => {
    const notActive = 0
    const active = 1
    return new Promise((resolve, reject) => {
      conn.query('UPDATE pattern SET status = ?', notActive, (err, result) => {
        conn.query(
          'UPDATE pattern SET status = ? WHERE id_pattern = ?',
          [active, id_pattern],
          (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          }
        )
      })
    })
  }
}
