const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
// const bodyParser =require('body-parser')

const Account = require('./models/account')

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
app.use(express.urlencoded({ extended: true }))

// index
app.get('/', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  // console.log('req.body', req.body)
  return Account.findOne({ email: req.body.email })
    .lean()
    .then((user) => {
      if (!user) {
        const alert = '該 email 尚未註冊'
        return res.render('login', { alert })
      }
      if (user.password !== req.body.password) {
        const alert = '您輸入的密碼有誤'
        return res.render('login', { alert })
      }
      return res.redirect(`/welcome/${user._id}`)
    })
})

app.get('/welcome/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then((user) => {
      res.render('welcome', { user })
    })
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})