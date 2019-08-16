module.exports = app => {
  const pattern = require('../controller/pattern')
  const auth = require('../helpers/auth')

  app
    .get('/pattern', auth.authInfo, pattern.getPattern)
    .get('/pattern/active', auth.authInfo, pattern.getPatternActive)
    .post('/pattern', auth.authInfo, pattern.insertPattern)
    .patch('/pattern/:id_pattern', auth.authInfo, pattern.updatePatternActive)
}
