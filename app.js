const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser =require('body-parser')

const Login = require('./models/login')

mongoose.connect('mongodb://localhost/login', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// index
app.get('/', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  const account = req.body.account
  const password = req.body.password
  Login.find({ email: account })
    .lean()
    .then((users) => {
      if (users.length === 0) {
        console.log('無使用者')
        const nonUser = 'is-invalid'
        return res.render('login', { nonUser })
      } else if (users[0].password !== password) {
        console.log('打錯密碼')
        const errorPassword = 'is-invalid'
        const option = req.body
        return res.render('login', { errorPassword, option })
      } else {
        return res.render('login', { users: users[0] })
      }
    })
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})