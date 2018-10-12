const mongoose = require('mongoose')

const OptionSchema = new mongoose.Schema({
  label: {
    type: String, 
    required: true
  }, // Yes
  count: {
    type: Number,
    required: true
  } // 13
})

const PollSchema = new mongoose.Schema({
  created: {
    type: Date,
    required: true
  }, // 21-12-2018T21:00:00
  question: {
    type: String,
    required: true
  }, // Is the sky blue?
  description:  {
    type: String,
    required: false
  }, // You never know...
  selectLimit: {
    type: Number,
    required: true
  }, // 1 (single) / 1+ (multi)
  expires: {
    type: Date,
    required: true
  }, // 21-12-2018T21:00:00
  number: {
    type: String,
    required: true
  }, // Poll identifier 1234
  answerCount: {
    type: Number,
    required: true
  }, // 15
  options: {
    type: [OptionSchema],
    required: true
  }
}, {
  versionKey: false
})

mongoose.model('Poll', PollSchema)