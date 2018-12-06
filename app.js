const createError   = require('http-errors')
const express       = require('express')
const path          = require('path')
const cookieParser  = require('cookie-parser')
const logger        = require('morgan')
const express_enforces_ssl = require('express-enforces-ssl')
const helmet 				= require('helmet')

// Database connection
require('./app/models/db')

const apiRouter   = require('./app/routes/api')
const indexRouter = require('./app/routes/index')

const app = express()

//app.enable('trust proxy') 
//app.use(express_enforces_ssl())
app.use(helmet())

// view engine setup
app.use(express.static(path.join(__dirname, 'app_public')))
app.set('views', path.join(__dirname + '/app', 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
