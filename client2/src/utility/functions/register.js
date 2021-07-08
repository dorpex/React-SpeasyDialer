

export const SubmitRegister = async (e) => {
  e.preventDefault()


    const form = document.getElementsByClassName('registerInput');

    const reqBody = {}
    for (const iterator of form) {
      reqBody[iterator.id] = iterator.value
      if (iterator.value === "") {
        alert(`שדה "${iterator.getAttribute('hebrewName')}" הינו שדה חובה!`)
        iterator.focus()
        return
      }
    }
    reqBody.passowrd = document.getElementById('password').value
    reqBody.rank = 'נציג'
    return await fetch('http://localhost:9000/users/register/submit', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(reqBody) // body data type must match "Content-Type" header
      })
    .then(async response => {
        return await response.json(response)
    })
    .then(response => {
      if (response.status) {
        alert('כבר משתמש עם המייל הנוכחי נא להחליף קטובת מייל')
      } else {
        
        
        response.ability = [
          {
            action : "manage",
            subject : "all"
          }
        ]

        return response.userData
      }
        
    })
}