const conn = require('../connection/connect')
module.exports = {
  getScore: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT user.username,user.id_user,score.score
				FROM score
				INNER JOIN user
                ON user.id_user = score.id_user
                ORDER BY score Desc
				LIMIT 10 OFFSET 0`,
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
  getScoreById: id_user => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT user.username,user.id_user,score.score
				FROM score
				INNER JOIN user
                ON user.id_user = score.id_user
                where user.id_user = ?
                ORDER BY Score Desc
				LIMIT 1 OFFSET 0`,
        id_user,
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
  postScore: data => {
    console.log(data)
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO score SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateScore: data => {
    console.log(data)
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE score SET score = ? WHERE id_user =? `,
        [data.score, data.id_user],
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
