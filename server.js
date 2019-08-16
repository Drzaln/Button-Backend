require('dotenv').config();
const express = require('express');
const app = express();
const Cors = require('cors')
const xssFilter = require('x-xss-protection')
const port = process.env.PORT || 8000
const bodyPraser = require('body-parser')
const user = require('./routes/user')
const score = require('./routes/score')
const pattern = require('./routes/pattern')

app.use(
	bodyPraser.urlencoded({
		extended: false
	})
);
app.use(bodyPraser.json());
app.listen(port);
app.use(xssFilter())
console.log('koneksi berjalan di port '+port);
// app.use(logger('dev'))

//Route to endpoint
user(app)
score(app)
pattern(app)

// app.use(Cors())
// app.options(Cors(corsOptions))