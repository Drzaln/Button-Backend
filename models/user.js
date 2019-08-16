const connection = require('../connection/connect')

module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT username,email,id_user FROM user where status=1`,
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
  getDetailUser: id_user => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE id_user = ?',
        Number(id_user),
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
  register: data => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getByEmail: email => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT id_user, email, username, salt, password, status FROM user WHERE email = ?',
        email,
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
  getByUsername: username => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SElECT id_user, email, username, salt, password, status FROM user WHERE username = ?',
        username,
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
  updateToken: (username, token) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET token = ? WHERE username =?`,
        [token, username],
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
  deleteToken: id_user => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET token = ? WHERE id_user =?`,
        [' ', Number(id_user)],
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
  getToken: token => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT token FROM user where token=?`,
        token,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  }
}
