(function() {

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
    button.onclick = () => container.parentNode.removeChild(container)
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
  
  const getQuestion = () => {
    return document.getElementById('q').value
  }
  
  const getDescription = () => {
    return document.getElementById('d').value
  }
  
  const getOptions = () => {
    let optionsElement = document.getElementById('options')
    let options = []
    optionsElement.querySelectorAll('input').forEach(i => options.push(i.value))
    return options
  }
  
  const noDuplicateOptions = () => {
    let upperCase = getOptions().map(option => option.toUpperCase())
    for(let i = 0; i < upperCase.length; i++) {
      let option = upperCase[i]
      delete upperCase[i]
      if(upperCase.indexOf(option) !== -1) {
        return false
      }
    }
    return true
  }
  
  const atLeastTwoOptions = () => {
    return getOptions().length >= 2
  }
  
  const noEmptyValues = () => {
    if(getQuestion().length > 0)
    //if(getDescription().length > 0)
    if(getOptions().map(o => o.length > 0).indexOf(false) === -1)
      return true
    return false
  }
  
  var pollPublishingNotStarted = true
  
  const prePublishCheck = () => {
    if(noEmptyValues() && atLeastTwoOptions() && noDuplicateOptions()) {
      if(pollPublishingNotStarted) {
        pollPublishingNotStarted = false
        publishPoll()
      }
    }
  }
  
  const handleSuccess = json => {
    window.location.href = `/poll/${json.number}`
  }
  
  const handleFailure = e => {
    alert("An error occurred! You will be redirected to the home page.")
    window.location.href = '/'
  }
  
  const publishPoll = () => {
    fetch('/api/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: getQuestion(),
        description: getDescription(),
        selectLimit: 1,
        options: getOptions()
      })
    })
    .then(r => r.json())
    .then(handleSuccess)
    .catch(handleFailure)
  }
  
  document.getElementById('addOption').onclick = addOption
  document.getElementById('publish').onclick = prePublishCheck
  
  addOption()
  addOption()

})()