document.addEventListener('DOMContentLoaded', () => {
  
  //actions
  show_form()

  //general functions
  function ce(element) {
    return document.createElement(element)
  }

  function show_form(){
    let messageForm = ce('form')

    let messageBodyLabel = ce('label')
    messageBodyLabel.innerText = 'Write your message (280 characters limit): '

    let brk1 = ce('br')

    let messageBodyField = ce('textarea')
    messageBodyField.name = 'body'
    messageBodyField.rows = '5'
    messageBodyField.cols = '54'
    messageBodyField.setAttribute('maxLength', '280')

    let brk2 = ce('br')

    let messageAuthorLabel = ce('label')
    messageAuthorLabel.innerText = '   Add your name (optional, 30 characters limit): '

    let messageAuthorField = ce('input')
    messageAuthorField.name = 'author'
    messageAuthorField.type = 'text'
    messageAuthorField.setAttribute('maxLength', '30')

    let brk3 = ce('br')
    
    let submit = ce('input')
    submit.type = 'submit'
    submit.value = 'Send'

    let response = ce('p')

    messageForm.append(messageBodyLabel, brk1, messageBodyField, brk2, messageAuthorLabel, messageAuthorField, brk3, submit, response)

    document.body.append(messageForm)

    messageForm.addEventListener('submit', () => {
      event.preventDefault()

      configObj = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              "body": event.target[0].value,
              "author": event.target[1].value
          })
        }
      fetch('https://angarusapi.herokuapp.com/messages', configObj)
      .then(res => res.json())
      .catch((err) => {
        response.innerText = 'Server error: ' + err.message
      })
      .then(json => {
        response.innerText = json['status']
        })
      messageForm.reset()
    })


    //make message form and send post request to API

  }




})