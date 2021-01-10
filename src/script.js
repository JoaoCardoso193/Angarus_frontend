document.addEventListener('DOMContentLoaded', () => {

    let messageForm = document.getElementById('messageForm')
    let response = document.createElement('p')
    messageForm.append(response)

    //form submit
    messageForm.addEventListener('submit', () => {
      event.preventDefault()

      configObj = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              "body": event.target[1].value,
              "author": event.target[0].value
          })
        }
      fetch('https://angarusapi.herokuapp.com/messages', configObj)
      .then(res => res.json())
      .catch((err) => {
        response.innerText = 'Server-side error: ' + err.message
      })
      .then(json => {
        response.innerText = json['status']
        })
      messageForm.reset()
    })
  }
)