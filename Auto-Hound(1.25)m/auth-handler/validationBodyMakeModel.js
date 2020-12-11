const validationOFbodyMakeModelEndpoint = "http://68.183.105.196:8080/api/validateMakeModelBody?access_token="
let lastValidationReqClear = true
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
    // console.log(bdy, selectedOpt);

    let toPushArr = []
    bdy.forEach((val) => {
        val = val.trim()
        const isPresent = selectedOpt.indexOf(val)
        if (isPresent === -1) {
            toPushArr.push(val)
        }
    })
    toPushArr = [...toPushArr, ...selectedOpt]
        // console.log(toPushArr);

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
    // const sanitizeArr = (arr) => {
    //     let mode = ['trim']
    //     let temp = []
    //     arr.forEach((val) => {
    //         val = val.trim()
    //         temp.push(val)
    //     })
    //     return temp
    // }
const afterResV = (obj) => {
    // console.log('called')

    let selectedBodyOpt = sanitizeArr(userData.VEHICLE['Body Type'])
    let selectedMakeOpt = sanitizeArr(userData.VEHICLE['Make'])
    let selectedModelOpt = sanitizeArr(userData.VEHICLE['Model'])
    const resbody = obj.bodyDefaultOptions
    const resmake = obj.makesDefaultOptions
    const resmodel = obj.modelsDefaultOptions
    const a1 = btnDivContentCreatorCheck('body-type-btn', makeDivInsertion(resbody, selectedBodyOpt))
    const a2 = btnDivContentCreatorCheck('make-type-btn', makeDivInsertion(resmake, selectedMakeOpt))
    const a3 = btnDivContentCreatorCheck('model-type-btn', makeDivInsertion(resmodel, selectedModelOpt))
        // document.getElementById('bodyTypes').innerHTML = a1
        // document.getElementById('makeOptions').innerHTML = a2
    document.getElementById('modelOptions').innerHTML = a3
        // arrMake = makeDivInsertion(resmake, selectedMakeOpt)
    arrModel = makeDivInsertion(resmodel, selectedModelOpt)
    document.querySelectorAll('.model-type-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                console.log(userData.VEHICLE.Model, 'b');

                e.preventDefault()
                const parentDiv = e.target.parentElement
                if (parentDiv.className === "btn-div model-type-btn") {
                    const isclicked = parentDiv.getAttribute('data-isclicked')
                    if (isclicked === "no") {
                        parentDiv.style.backgroundColor = "#0266ff"
                        parentDiv.style.color = "white"
                        parentDiv.children[0].style.display = "none"
                        parentDiv.children[1].style.display = "inline"
                        userData.VEHICLE['Model'].push(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "yes");
                    } else {
                        parentDiv.style.backgroundColor = "#EAEAEA"
                        parentDiv.style.color = "black"
                        parentDiv.children[0].style.display = "inline"
                        parentDiv.children[1].style.display = "none"
                        userData.VEHICLE['Model'].remove(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "no");
                    }

                }
                console.log(userData.VEHICLE.Model, 'a');

                // validateMakeModelBodyFun()

            })
        })
        // document.querySelectorAll('.make-type-btn').forEach((btn) => {
        //     btn.addEventListener('click', (e) => {
        //         e.preventDefault()
        //         const parentDiv = e.target.parentElement
        //         if (parentDiv.className === "btn-div make-type-btn") {
        //             const isclicked = parentDiv.getAttribute('data-isclicked')
        //             if (isclicked === "no") {
        //                 parentDiv.style.backgroundColor = "#0266ff"
        //                 parentDiv.style.color = "white"
        //                 parentDiv.children[0].style.display = "none"
        //                 parentDiv.children[1].style.display = "inline"
        //                 userData.VEHICLE['Make'].push(parentDiv.children[2].innerText)
        //                 parentDiv.setAttribute("data-isclicked", "yes");
        //             } else {
        //                 parentDiv.style.backgroundColor = "#EAEAEA"
        //                 parentDiv.style.color = "black"
        //                 parentDiv.children[0].style.display = "inline"
        //                 parentDiv.children[1].style.display = "none"
        //                 userData.VEHICLE['Make'].remove(parentDiv.children[2].innerText)
        //                 parentDiv.setAttribute("data-isclicked", "no");
        //             }

    //         }
    //         validateMakeModelBodyFun()

    //     })
    // })
    // document.querySelectorAll('.body-type-btn').forEach((btn) => {
    //     btn.addEventListener('click', (e) => {
    //         e.preventDefault()
    //         const parentDiv = e.target.parentElement
    //         if (parentDiv.className === "btn-div body-type-btn") {
    //             const isclicked = parentDiv.getAttribute('data-isclicked')
    //             if (isclicked === "no") {
    //                 parentDiv.style.backgroundColor = "#0266ff"
    //                 parentDiv.style.color = "white"
    //                 parentDiv.children[0].style.display = "none"
    //                 parentDiv.children[1].style.display = "inline"
    //                 userData.VEHICLE['Body Type'].push(parentDiv.children[2].innerText)
    //                 parentDiv.setAttribute("data-isclicked", "yes");
    //             } else {
    //                 parentDiv.style.backgroundColor = "#EAEAEA"
    //                 parentDiv.style.color = "black"
    //                 parentDiv.children[0].style.display = "inline"
    //                 parentDiv.children[1].style.display = "none"
    //                 userData.VEHICLE['Body Type'].remove(parentDiv.children[2].innerText)
    //                 parentDiv.setAttribute("data-isclicked", "no")
    //             }
    //             validateMakeModelBodyFun()
    //         }

    //     })
    // // })
    // selectExpWithoutClick('body-type-btn', selectedBodyOpt, 'Body Type')
    // selectExpWithoutClick('make-type-btn', selectedMakeOpt, 'Make')
    selectExpWithoutClick('model-type-btn', selectedModelOpt, 'Model')
    lastValidationReqClear = true
        // console.log('ended');


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
    console.log(lastValidationReqClear);

    if (lastValidationReqClear) {
        console.log('called');

        lastValidationReqClear = false
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

}