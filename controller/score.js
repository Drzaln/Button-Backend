const score = require('../models/score')
const respon = require('../helpers/response')

module.exports = {
  getScore: (req, res) => {
    score
      .getScore()
      .then(resultUser => {
        respon.response(res, resultUser, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  getScoreId: (req, res) => {
    const id_user = req.params.id_user
    score
      .getScoreById(id_user)
      .then(resultUser => {
        respon.response(res, resultUser, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  postScore: (req, res) => {
    const data = {
      id_user: req.body.id_user,
      score: req.body.score
    }
    score
      .postScore(data)
      .then(() => {
        respon.response(res, data, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  updateScore: (req, res) => {
    const data = {
      id_user: req.body.id_user,
      score: req.body.score
    }
    score
      .updateScore(data)
      .then(() => {
        respon.response(res, data, 200)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
