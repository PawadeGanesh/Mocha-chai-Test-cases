let express = require('express')
let app = express()
let mongoose = require('mongoose')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let port = 8080
let book = require('./app/routes/book')

mongoose
  .connect('mongodb://localhost/ganisbook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to mongoDB...'))
  .catch((err) => console.log(err))

//parse application/json and look for raw text
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/', (req, res) => res.json({ message: 'Welcome to our Bookstore!' }))

app.route('/book').get(book.getBooks).post(book.postBook)
app
  .route('/book/:id')
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook)

app.listen(port)
console.log('Listening on port ' + port)

module.exports = app // for testing
