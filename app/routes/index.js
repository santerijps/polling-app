const express         = require('express')
const router          = express.Router()
const pollController  = require('../controllers/pollController')

// GET home page
router.get('/', function(req, res, next) {
  pollController.getAll((e, r) => {
    if(e) throw e
    res.render('index', { 
      title: 'POLLER',
      description: 'Create public polls without registration',
      polls: r
    })
  })
})

// GET specified poll
router.get('/poll/:pollNumber', (req, res, next) => {
  pollController.getByPollNumber(req.params.pollNumber, (e, r) => {
    if(e) throw e
    r ? res.render('poll', {
      title: r.question,
      description: r.description,
      options: r.options
    }) : (
      res.render('error', {
        message: 'Poll not found!',
        error: {
          status: 404
        }
      })
    )
  })
})

// GET specified poll results
router.get('/poll/:pollNumber/results', (req, res, next) => {
  pollController.getByPollNumber(req.params.pollNumber, (e, r) => {
    if(e) throw e
    r ? res.render('results', {
      title: `Results for "${r.question}"`,
      description: `This poll has ${r.answerCount} answers`,
      answerCount: r.answerCount,
      options: JSON.stringify(r.options),
      titleMarginBottom: '2%'
    }) : (
      res.render('error', {
        message: 'Poll not found!',
        error: {
          status: 404
        }
      })
    )
  })
})

// GET create poll page
router.get('/create', (req, res, next) => {
  res.render('create', {
    title: 'CREATE A POLL',
    description: 'It\'s that easy'
  })
})

module.exports = router
