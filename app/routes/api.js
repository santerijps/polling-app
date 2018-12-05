const express       = require('express')
const router        = express.Router()
const apiController = require('../controllers/apiController')

router.route('/polls/:pollNumber')
  .get(apiController.getByPollNumber)

router.route('/polls')
  .get(apiController.getAllPolls)
  .post(apiController.createPoll)
  .put(apiController.answerToPoll)  
  //.delete(apiController.deletePoll)

module.exports = router