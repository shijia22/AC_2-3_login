const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static('public'))

// index
app.get('/', (req, res) => {
  res.render('login')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})