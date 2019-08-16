const pattern = require('../models/pattern')
const respon = require('../helpers/response')

module.exports = {
  getPattern: (req, res) => {
    pattern
      .getPattern()
      .then(resultPattern => {
        respon.response(res, resultPattern, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  getPatternActive: (req, res) => {
    pattern
      .getPatternActive()
      .then(resultPattern => {
        respon.response(res, resultPattern, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  insertPattern: (req, res) => {
    const data = {
      pattern: req.body.pattern,
      combo: req.body.combo,
      status: 0
    }
    pattern
      .insertPattern(data)
      .then(() => {
        respon.response(res, data, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  updatePatternActive: (req, res) => {
    const id_pattern = req.params.id_pattern
    pattern
      .updatePatternActive(id_pattern)
      .then((resultPattern) => {
        respon.response(res, resultPattern, 200)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
