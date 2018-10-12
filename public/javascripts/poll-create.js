const addOption = () => {
  let optionsElement = document.getElementById('options')
  // create main container element
  let container = document.createElement('DIV')
  container.setAttribute('class', 'input-group mb-3')
  // create button container element
  let buttonContainer = document.createElement('DIV')
  buttonContainer.setAttribute('class', 'input-group-prepend')
  // create button element
  let button = document.createElement('BUTTON')
  button.setAttribute('class', 'btn btn-outline-danger')
  button.setAttribute('style', 'border: 1px solid #ced4da; font-weight: bold;')
  button.setAttribute('tabindex', '-1')
  button.innerText = 'X'
  button.addEventListener('click', () => container.parentNode.removeChild(container))
  // create input element
  let input = document.createElement('INPUT')
  input.setAttribute('type', 'text')
  input.setAttribute('class', 'form-control')
  input.setAttribute('placeholder', 'Option text')
  // append elements
  buttonContainer.appendChild(button)
  container.appendChild(buttonContainer)
  container.appendChild(input)
  optionsElement.appendChild(container)
}

var pollPublished = false
const publishPoll = () => {
  if(pollPublished) return
  pollPublished = true
  let question = document.getElementById('q').value
  let description = document.getElementById('d').value
  let optionsElement = document.getElementById('options')
  let options = []
  optionsElement.querySelectorAll('input').forEach(i => options.push(i.value))
  fetch('/api/polls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: question,
      description: description,
      selectLimit: 1,
      options: options
    })
  }).then(r => r.json()).then(json => {
    window.location.href = `/poll/${json.number}`
  }).catch(e => {
    alert(e)
    window.location.href = '/'
  })
}