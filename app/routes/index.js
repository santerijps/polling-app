const express         = require('express')
const router          = express.Router()
const pollController  = require('../controllers/pollController')

// GET home page
router.get('/', function(req, res, next) {
  pollController.getAll((e, r) => {
    if(e) throw e
    res.render('index', { 
      title: 'PollingAPP',
      description: 'Create polls and get the latest opinions',
      polls: r
    })
  })
})

// redirects to results page if poll already answered
// returns true if redirected, else returns false
const skipToPollResultsIfNeeded = (req, res) => {
  let ap = req.cookies['ap']
  if(ap !== undefined) {
    ap = JSON.parse(ap)
    if(ap.indexOf(req.params.pollNumber) !== -1) {
      res.redirect(`/poll/${req.params.pollNumber}/results`)
      return true
    } 
  }
  return false
}

// GET specified poll
router.get('/poll/:pollNumber', (req, res, next) => {
  if(!skipToPollResultsIfNeeded(req, res)) {
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
  }
})

// GET specified poll results
router.get('/poll/:pollNumber/results', (req, res, next) => {
  pollController.getByPollNumber(req.params.pollNumber, (e, r) => {
    if(e) throw e
    r ? res.render('results', {
      title: `Results for "${r.question}"`,
      description: `Totaling at ${r.answerCount} answers`,
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
    title: 'Create a poll',
    description: '...and get going'
  })
})

module.exports = router
