module.exports = app => {
  const score = require('../controller/score')
  const auth = require('../helpers/auth')

  app
    .get('/score', auth.authInfo, score.getScore)
    .get('/score/:id_user', auth.authInfo, score.getScoreId)
    .post('/score', auth.authInfo, auth.accessToken, score.postScore)
    .patch('/score', auth.authInfo, auth.accessToken, score.updateScore)
}
