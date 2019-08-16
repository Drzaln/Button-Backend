const user = require('../models/user')
const respon = require('../helpers/response')
const jwt = require('jsonwebtoken')

module.exports = {
  getUsers: (req, res) => {
    user.getUsers().then(resultUser => {
      resultUser.map(item => {
        delete item.salt
        delete item.password
      })
      respon.response(res, resultUser, 200)
    })
  },
  getDetailUser: (req, res) => {
    const id_user = req.params.id_user
    console.log(id_user)
    user
      .getDetailUser(id_user)
      .then(resultUser => {
        const result = resultUser[0]
        respon.response(res, result, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  register: (req, res) => {
    const salt = respon.getRandomSalt(25)
    const passHash = respon.setPass(req.body.password, salt)

    const data = {
      email: req.body.email,
      username: req.body.username,
      password: passHash.passHash,
      salt: passHash.salt,
      token: '',
      status: 1,
      level: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }
    user
      .register(data)
      .then(resultUser => {
        console.log(resultUser)
        respon.response(res, resultUser, 200)
      })
      .catch(err => {
        console.log(err)
        return respon.response(res, null, 404, 'Username already used !!!')
      })
  },
  login: (req, res) => {
    const username = req.body.username
    const pass = req.body.password
    user
      .getByUsername(username)
      .then(result => {
        const dataUser = result[0]
        console.log(result)
        const userPass = respon.setPass(pass, dataUser.salt).passHash

        if (userPass === dataUser.password) {
          dataUser.token = jwt.sign(
            {
              id_user: dataUser.id_user
            },
            process.env.SECRET_KEY,
            {
              expiresIn: '120h'
            }
          )

          delete dataUser.salt
          delete dataUser.password
          user
            .updateToken(username, dataUser.token)
            .then(result => {
              console.log(result)
            })
            .catch(err => {
              console.log(err)
            })
          return respon.response(res, dataUser, 200)
        } else {
          return respon.response(res, null, 403, 'Wrong Password !!!')
        }
      })
      .catch(err => {
        console.log(err)
        return respon.response(res, null, 403, 'Username Not Register !!!')
      })
  },
  logout: (req, res) => {
    const id_user = Number(req.body.id_user)
    console.log(req.body.id_user)
    user
      .deleteToken(id_user)
      .then(resultUser => {
        respon.response(res, resultUser, 200)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getToken: (req, res) => {
    const token = req.params.token
    user
      .getToken(token)
      .then(resultUser => {
        respon.response(res, resultUser, 200)
      })
      .catch(() => {
        return respon.response(res, null, 403, 'Expired !!!')
      })
  }
}
