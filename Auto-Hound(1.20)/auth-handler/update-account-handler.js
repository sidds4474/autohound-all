const accountEditEndpoint = "http://68.183.105.196:8080/api/users/editAccountDetails?access_token="

const getCookieEdit = (key) => {
    const tokenFromStorage = localStorage.getItem('access_token')
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return tokenFromStorage;
}

const createReqEdit = async(url, data) => {
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
    if (!res_data.error) {
        // alert('SUCCESS')
        document.getElementById('mssg').innerText = "Account successfully updated."
        document.getElementById('mssg').style.color = "green"
        document.getElementById('mssg').style.visibility = "visible"
        setTimeout(() => {
            document.getElementById('mssg').style.visibility = "hidden"

        }, 1500)

    } else {
        document.getElementById('mssg').innerText = "Error"
        document.getElementById('mssg').style.color = "red"
        document.getElementById('mssg').style.visibility = "visible"

    }

}

const editAccountDetails = () => {
    const token = getCookieEdit('access_token')
    var creds = {}
    creds = getDetails(creds)
    creds = JSON.stringify(creds)
    createReqEdit(accountEditEndpoint + token, creds)
}

document.getElementById('account-form').addEventListener('submit', (e) => {
    e.preventDefault()
    editAccountDetails()
})