module.exports = app => {
  const user = require('../controller/user')
  const auth = require('../helpers/auth')
  app
    .get('/user', auth.authInfo, auth.accessToken, user.getUsers)
    .get('/user/token/:token', auth.authInfo, auth.accessToken, user.getToken)
    .post('/user/register', auth.authInfo, user.register)
    .post('/user/login', auth.authInfo, user.login)
    .post('/user/logout', auth.authInfo, auth.accessToken, user.logout)
}
