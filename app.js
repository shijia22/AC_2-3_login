const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const Account = require('./models/account')

mongoose.connect('mongodb://localhost/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public')) // express 載入靜態檔案
app.use(express.urlencoded({ extended: true })) // setting body-parser
// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser())
app.use(
  session({
    key: 'user_sid',
    secret: 'someRandomStuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000,
    },
  })
)

// index
app.get('/', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  return Account.find()
    .lean()
    .then((users) => {
      const user = users.find((user) => user.email === email)
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
    .catch((error) => console.log(error))
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
