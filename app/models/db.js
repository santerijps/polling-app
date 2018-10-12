const mongoose = require('mongoose')
const mongoUrl = 'mongodb://127.0.0.1/polling-app'

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
})

mongoose.connection.on('connected', () => { 
  console.log(`Mongoose connected to ${mongoUrl}`) 
}).on('error', err => { 
  console.log('Mongoose connection error:', err) 
}).on('disconnected', () => { 
  console.log('Mongoose disconnected')
})

require('./poll')