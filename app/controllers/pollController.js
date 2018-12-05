const mongoose  = require('mongoose')
const Poll      = mongoose.model('Poll')

// Reformats the options to the correct format
const initializeOptions = options => 
  options.map(o => ({label: o, count: 0}))

// A generator that initializes its starting value to be
// the current date timestamp in milliseconds.
// Yields number as a hex value
const pollNumberGenerator = (function*() {
  let n = +new Date(); for(;;) yield (++n).toString(16)
})()

// Returns the next pollNumberGenerator value
const generatePollNumber = () => 
  pollNumberGenerator.next().value

module.exports = {

  /*
    Parameters
      pollNumber: String
      optionIndex: Number
  */
  answer: (pollNumber, optionIndex, callback) => {
    const optionField = `options.${optionIndex}.count`
    const updateStatement = {'$inc': {[optionField]: 1, answerCount: 1}}
    Poll.findOneAndUpdate({
      number: pollNumber
    }, updateStatement, {new:   true},
      (e, r) => callback && callback(e, r))
  },

  // No parameters
  getAll: callback => {
    Poll.find()
      .sort({answerCount: -1})
      .exec((e,r) => callback && callback(e, r))
  },

  /*
    Parameters
      pollNumber: String
  */
  getByPollNumber: (pollNumber, callback) => {
    Poll.findOne({
      number: pollNumber
    }, (e, r) => callback && callback(e, r))
  },

  /*
    Parameters
      question:     String
      description:  String
      selectLimit:  Number
      options:      [String]
  */
  create: (question, description, selectLimit, options, callback) => {
    Poll.create({
      created: new Date(),
      question: question,
      description: description,
      selectLimit: selectLimit,
      number: generatePollNumber(),
      answerCount: 0,
      options: initializeOptions(options)
    }, (e, r) => callback && callback(e, r))
  },

  /*
    Parameters
      pollNumber: String
  */
  delete: (pollNumber, callback) => {
    Poll.deleteOne({
      number: pollNumber
    }, (e, r) => callback && callback(e, r))
  }

}