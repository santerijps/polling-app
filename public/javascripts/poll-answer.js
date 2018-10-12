let optionIndex = null
const selectOption = (e, selectedOption) => {
  optionIndex = selectedOption
  e.parentNode.parentNode.querySelectorAll('A').forEach(a => a.classList.remove('active'))
  e.classList.add('active')
}

var answerSubmitted = false
const submitAnswer = () => {
  if(optionIndex === null) return
  if(answerSubmitted) return
  answerSubmitted = true
  fetch('/api/polls', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pollNumber: pollNumber,
      optionIndex: optionIndex
    })
  }).then(r => r.json()).then(json => {
    let answeredPolls = Cookies.get('ap')
    if(answeredPolls === undefined) {
      answeredPolls = []
    } else {
      answeredPolls = JSON.parse(answeredPolls)
    }
    answeredPolls.push(pollNumber)
    Cookies.set('ap', answeredPolls, {expires: 1})
    window.location.href = `/poll/${pollNumber}/results`
  }).catch(e => {
    alert(e)
    window.location.href = '/'
  })
}

const pollNumber = window.location.pathname.split('/')[2]

// redirect user to results page if they have already answered
let ap = Cookies.get('ap')
if(ap !== undefined) {
  ap = JSON.parse(ap)
  if(ap.indexOf(pollNumber) !== -1) {
    window.location.href = `/poll/${pollNumber}/results`
  }
}