const pollController = require('./pollController')

const handleMongoAction = (r, error, response, errorCode, successCode) => {
  if(error) r.status(errorCode).json(error)
  else r.status(successCode).json(response)
}

const handleMongoFind = (r, error, response) => {
  handleMongoAction(r, error, response, 404, 200)
}

const handleMongoCreate = (r, error, response) =>
  handleMongoAction(r, error, response, 400, 201)

const handleMongoUpdate = (r, error, response) =>
  handleMongoAction(r, error, response, 400, 200)

module.exports = {

  getAllPolls: (req, res) => {
    pollController.getAll((e, r) => {
      handleMongoFind(res, e, r)
    })
  },

  getByPollNumber: (req, res) => {
    pollController.getByPollNumber(req.params.pollNumber, (e, r) => {
      handleMongoFind(res, e, r)
    })
  },

  createPoll: (req, res) => {
    const b = req.body
    pollController.create(b.question, b.description, b.selectLimit, b.options, (e, r) => {
      handleMongoCreate(res, e, r)
    })
  },

  deletePoll: (req, res) => {
    pollController.delete(req.body.pollNumber, (e, r) => {
      handleMongoFind(res, e, r)
    })
  },

  answerToPoll: (req, res) => {
    pollController.answer(req.body.pollNumber, req.body.optionIndex, (e, r) => {
      handleMongoUpdate(res, e, r)
    })
  }

}