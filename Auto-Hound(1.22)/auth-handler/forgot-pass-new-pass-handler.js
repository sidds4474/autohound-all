const changePassEndpoint = "http://68.183.105.196:8080/api/users/forgotpassword-new-password"
const $changePassForm = document.getElementById('changePass-form')
const errorHeading = document.getElementById('error-heading')
const urlParams = new URLSearchParams(window.location.search);
const uidFromParam = urlParams.get('uid');
const tokenFromParam = urlParams.get('token');

const afterAjax = (obj) => {


    if (obj.passwordChanged) {
        $changePassForm.style.display = "none"
        const heading = document.querySelector('.form-container>h1')
        heading.style.color = "#0266ff"
        setTimeout(() => {
            window.location.href = "../home"
        }, 2000)
        heading.style.fontSize = "30px"
        heading.style.paddingTop = "100px"
        heading.innerHTML = obj.message
    } else {
        errorHeading.innerHTML = obj.message
        errorHeading.style.visibility = "visible"
    }



}


const createReq = async(url, data) => {
    document.getElementById('l-loader').style.display = "inline-block"
    errorHeading.style.visibility = "hidden"

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
    // console.log(res_data);
    document.getElementById('l-loader').style.display = "none"

    if (!res_data.error) {
        afterAjax(res_data)

    } else {
        alert('ERROR OCCURED PLEASE LOGIN AGAIN')

    }
}


$changePassForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target.elements
    const newPassword = form.newPassword.value
    const cnewPassword = form.newPasswordConfirm.value
    if (newPassword === cnewPassword) {
        const isValid = validatePassword(newPassword)
        // console.log(isValid);
        if (isValid) {
            var creds = {
                newPassword: form.newPassword.value,
                newPasswordConfirm: form.newPasswordConfirm.value,
                uid:uidFromParam,
                token:tokenFromParam
            }
            creds = JSON.stringify(creds)
            errorHeading.style.visibility = "hidden"
            createReq(changePassEndpoint, creds)
        } else {
            errorHeading.innerHTML = "Passwords must contain at least 8 characters, including uppercase, lowercase letters,  numbers and special characters."
            errorHeading.style.visibility = "visible"
        }
    } else {
        errorHeading.innerHTML = "The passwords did not match. Please try entering your passwords again."
        errorHeading.style.visibility = "visible"
    }


})



function validatePassword(str) {
    var result;
    if (str.match(/[a-z]/g) && str.match(
        /[A-Z]/g) && str.match(
        /[0-9]/g) && str.match(
        /[^a-zA-Z\d]/g) && str.length >= 8) {
        result = true;
    } else {
        result = false;
    }
    return result
}