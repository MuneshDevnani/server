document.getElementById("loginform").addEventListener('submit',(e) => {
    e.preventDefault() //This will stop the form from behaving in its default manner

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value
    
    fetch('/login',{
        method: 'POST',
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({"username" : username,"password" : password})
    })
    .then(response => {
        response.json().then(msg => {
            alert(msg.message)
        })
    }) 
})