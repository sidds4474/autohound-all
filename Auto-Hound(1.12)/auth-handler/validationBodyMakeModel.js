const validationOFbodyMakeModelEndpoint = "http://68.183.105.196:8080/api/validateMakeModelBody?access_token="

// const unclickAllBtn = (classname) => {
//     const btns = document.querySelectorAll("." + classname)
//     btns.forEach((btn) => {
//         const clicked = btn.getAttribute('data-isclicked')
//         if (clicked === "yes") {
//             btn.children[1].click()
//         }
//     })
// }
const makeDivInsertion = (bdy, selectedOpt) => {
    console.log(bdy, selectedOpt);

    let toPushArr = []
    bdy.forEach((val) => {
        val = val.trim()
        const isPresent = selectedOpt.indexOf(val)
        if (isPresent === -1) {
            toPushArr.push(val)
        }
    })
    toPushArr = [...selectedOpt, ...toPushArr]

    return toPushArr

}
const selectExpWithoutClick = (classname, name, dataKey) => {
    const btns = document.querySelectorAll("." + classname)
    btns.forEach((btn) => {
        const val = btn.children[2].innerText
        const parentDiv = btn
        const isPresent = name.indexOf(val)
        if (isPresent != -1) {

            parentDiv.style.backgroundColor = "#0266ff"
            parentDiv.style.color = "white"
            parentDiv.children[0].style.display = "none"
            parentDiv.children[1].style.display = "inline"
                // userData.VEHICLE[dataKey].push(parentDiv.children[2].innerText)
            parentDiv.setAttribute("data-isclicked", "yes");

        }
    })
}
const sanitizeArr = (arr) => {
    let mode = ['trim']
    let temp = []
    arr.forEach((val) => {
        val = val.trim()
        temp.push(val)
    })
    return temp
}
const afterResV = (obj) => {
    // console.log('called');

    let selectedBodyOpt = sanitizeArr(userData.VEHICLE['Body Type'])
    let selectedMakeOpt = sanitizeArr(userData.VEHICLE['Make'])
    let selectedModelOpt = sanitizeArr(userData.VEHICLE['Model'])
    const resbody = obj.bodyDefaultOptions
    const resmake = obj.makesDefaultOptions
    const resmodel = obj.modelsDefaultOptions
    const a1 = makeDivInsertion(resbody, selectedBodyOpt)
    const a2 = makeDivInsertion(resmake, selectedMakeOpt)
    const a3 = makeDivInsertion(resmodel, selectedModelOpt)
    userData.VEHICLE['Body Type'] = a1
    userData.VEHICLE['Make'] = a2
    userData.VEHICLE['Model'] = a3
    selectExpWithoutClick('body-type-btn', a1, 'Body Type')
    selectExpWithoutClick('make-type-btn', a2, 'Make')
    selectExpWithoutClick('model-type-btn', a3, 'Model')
    console.log('ended');




}
const createSearchReqValidation = async(url, data) => {
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
    afterResV(res_data)

}
const getCookieV = (key) => {
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
const validateMakeModelBodyFun = () => {
    const token = getCookieV('access_token')
    let formData = {
        selectedModel: sanitizeArr(userData.VEHICLE['Model']),
        selectedBody: sanitizeArr(userData.VEHICLE['Body Type']),
        selectedMake: sanitizeArr(userData.VEHICLE['Make'])
    }
    console.log(formData);

    formData = JSON.stringify(formData)
    createSearchReqValidation(validationOFbodyMakeModelEndpoint + token, formData)

}