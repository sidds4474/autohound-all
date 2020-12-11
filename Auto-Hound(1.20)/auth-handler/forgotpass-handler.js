const forgotPassEndpoint = "http://68.183.105.196:8080/api/users/forgotPassword"
const reqForgot = async(url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    })
    const res_data = await res.json()
    console.log(res_data);
    if (res_data.success) {
        document.getElementById('error-heading').style.visibility = "hidden"
        forgotForm.style.display = "none"
        document.querySelector('#mssg-div').style.display = "none"
        document.querySelector('#mssg-span').innerHTML = "Perfect, check your email to reset your password!"
    } else {
        document.getElementById('error-heading').innerText = res_data.message
        document.getElementById('error-heading').style.visibility = "visible"

    }


}
const forgotForm = document.querySelector('#forgot-form')
forgotForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value
        ///// sending email to server then-------
    let data = {
        email: email
    }
    data = JSON.stringify(data)
    reqForgot(forgotPassEndpoint, data)


})