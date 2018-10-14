var pollNumber      = window.location.pathname.split('/')[2]
var optionIndex     = null  // the selected option index
var answerSubmitted = false // if user clicks the submit button, this will be true

// selects an option
const selectOption = (e, selectedOption) => {
  optionIndex = selectedOption
  e.parentNode.parentNode.querySelectorAll('A').forEach(a => a.classList.remove('active'))
  e.classList.add('active')
}

// returns true if submitting is allowed
const readyToSubmit = () => {
  if(optionIndex === null) return false
  if(answerSubmitted) return false
  answerSubmitted = true
  return true
}

// returns an object with request options
const buildRequestObject = () => {
  return {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pollNumber: pollNumber,
      optionIndex: optionIndex
    })
  }
}

// submits the answer
const submitAnswer = () => {
  if(readyToSubmit()) {
    fetch('/api/polls', buildRequestObject())
    .then(r => r.json())
    .then(handleSuccess)  // success
    .catch(handleFailure) // failure
  }
}

// adds the poll number to the answered polls cookie
const setCookie = () => {
  let answeredPolls = Cookies.get('ap')
  if(answeredPolls === undefined) answeredPolls = []
  else answeredPolls = JSON.parse(answeredPolls)
  answeredPolls.push(pollNumber)
  Cookies.set('ap', answeredPolls, {expires: 1})
}

// redirects to poll results
const redirectToResults = () => {
  window.location.href = `/poll/${pollNumber}/results`
}

// called when answering poll is successful
const handleSuccess = json => {
  setCookie()
  redirectToResults()
}

// called when answering poll fails
const handleFailure = e => {
  alert(e)
  window.location.href = '/'
}