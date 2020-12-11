const obdiiSearchEndpoint = "http://68.183.105.196:8080/api/searchOBDII?access_token="
const $optionTemplate = document.getElementById('searchbar-option-template').innerHTML
const includeSearchEndpoint = "http://68.183.105.196:8080/api/searchInclude?access_token="
const makeSearchEndpoint = "http://68.183.105.196:8080/api/searchMake?access_token="
const modelSearchEndpoint = "http://68.183.105.196:8080/api/searchModel?access_token="
const createSearchReqObdii = async(url, data) => {
    // console.log('re-de-init');
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
    const optionVals = res_data.obdiiOptions
    let arr = sanitizeArr(res_data.obdiiOptions.slice(0, 31))
    console.log(arr);
    const opt = userData.CONDITION['OBDII Issues']
    opt.forEach((e) => {
        arr.remove(e)
    })
    console.log(arr);
    let optns = optionHtml(arr, 'obdiiissues-type-btn', 'obdiiOptions', 'obdii')
    document.getElementById('obdiisearchoptions').style.height = "120px"
    if (optionVals.length === 0) {
        optns = "<a>No Result Found</a>"
        document.getElementById('obdiisearchoptions').style.height = "30px"
    }
    document.getElementById('obdiisearchoptions').innerHTML = optns
    if (document.getElementById('obdii-searchbar').value.length > 0) {
        document.getElementById('obdiisearchoptions').style.display = "flex"
    } else {
        document.getElementById('obdiisearchoptions').style.display = "none"
    }
}
const createSearchReqMake = async(url, data) => {
    // console.log('re-de-init');
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
    const optionVals = res_data.makeOptions
    let arr = res_data.makeOptions.slice(0, 31)
    console.log(arr);
    const opt = userData.VEHICLE['Make']
    opt.forEach((e) => {
        arr.remove(e)
    })
    console.log(arr);
    let optns = optionHtml(arr, 'make-type-btn', 'makeOptions', 'make')
    document.getElementById('makesearchoptions').style.height = "120px"
    if (optionVals.length === 0) {
        optns = "<a>No Result Found</a>"
        document.getElementById('makesearchoptions').style.height = "30px"
    }
    document.getElementById('makesearchoptions').innerHTML = optns
    if (document.getElementById('make-searchbar').value.length > 0) {
        document.getElementById('makesearchoptions').style.display = "flex"
    } else {
        document.getElementById('makesearchoptions').style.display = "none"
    }
}
const createSearchReqModel = async(url, data) => {
    // console.log('re-de-init');
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
    const optionVals = res_data.modelOptions
    let arr = res_data.modelOptions.slice(0, 31)
        // console.log(arr);
    const opt = userData.VEHICLE['Model']
    opt.forEach((e) => {
            arr.remove(e)
        })
        // console.log(arr);
    let optns = optionHtml(arr, 'model-type-btn', 'modelOptions', 'model')
    document.getElementById('modelsearchoptions').style.height = "120px"
    if (optionVals.length === 0) {
        optns = "<a>No Result Found</a>"
        document.getElementById('modelsearchoptions').style.height = "30px"
    }
    document.getElementById('modelsearchoptions').innerHTML = optns
    if (document.getElementById('model-searchbar').value.length > 0) {
        document.getElementById('modelsearchoptions').style.display = "flex"
    } else {
        document.getElementById('modelsearchoptions').style.display = "none"
    }
}
const createSearchReqInclude = async(url, data) => {
    // console.log('re-de-init');
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
    const optionVals = res_data.includeOptions
    let arr = res_data.includeOptions.slice(0, 31)
    console.log(arr);
    const opt = userData.CONDITION['INCLUDE']
    opt.forEach((e) => {
        arr.remove(e)
    })
    console.log(arr);
    let optns = optionHtml(arr, 'include-type-btn', 'includeOptions', 'include')
    document.getElementById('includesearchoptions').style.height = "120px"
    if (optionVals.length === 0) {
        optns = "<a>No Result Found</a>"
        document.getElementById('includesearchoptions').style.height = "30px"
    }
    document.getElementById('includesearchoptions').innerHTML = optns
    if (document.getElementById('include-searchbar').value.length > 0) {
        document.getElementById('includesearchoptions').style.display = "flex"
    } else {
        document.getElementById('includesearchoptions').style.display = "none"
    }
}
const isSearchedClicked = (classNameOfBtn, name) => {
    var res
    const btns = document.querySelectorAll("." + classNameOfBtn)
    btns.forEach((btn) => {
        const val = btn.children[2].innerText.trim()
        if (val === name.trim()) {
            const clicked = btn.getAttribute('data-isclicked')

            if (clicked === "yes") {
                res = true
            } else {
                res = false
            }
        }
    })
    return res
}
const insertValueInDiv = (e) => {
    const inp = e.target.parentNode.parentNode.children[0]
    inp.value = ""
    const option = e.target
    const btnClass = option.getAttribute('data-btnclass')
    const type = option.getAttribute('data-type')
    const btnContainer = option.getAttribute('data-btncontainer')
    const test = document.getElementById(btnContainer).innerHTML
    let data = option.innerText
    data.toString()
    data.trim()
    console.log(data);

    if (type === "obdii") {
        console.log('k');

        const isdefault = arrObdii.indexOf(data)
        console.log(isdefault);

        if (isdefault != -1) {
            const isAlreadyClicked = isSearchedClicked(btnClass, data)

            if (isAlreadyClicked) {
                option.parentNode.style.display = "none"
                return
            }
            getDataAndBtn(btnClass, [data]) //for click event on btn to select event
            option.parentNode.style.display = "none"
            return
        }
        arrObdii.push(data)
    }
    if (type === "make") {
        console.log('k');

        const isdefault = arrMake.indexOf(data)
        console.log(isdefault);

        if (isdefault != -1) {
            const isAlreadyClicked = isSearchedClicked(btnClass, data)

            if (isAlreadyClicked) {
                option.parentNode.style.display = "none"
                return
            }
            getDataAndBtn(btnClass, [data]) //for click event on btn to select event
            option.parentNode.style.display = "none"
            return
        }
        arrMake.push(data)
    }
    if (type === "model") {
        console.log('k');

        const isdefault = arrModel.indexOf(data)
        console.log(isdefault);

        if (isdefault != -1) {
            const isAlreadyClicked = isSearchedClicked(btnClass, data)

            if (isAlreadyClicked) {
                option.parentNode.style.display = "none"
                return
            }
            getDataAndBtn(btnClass, [data]) //for click event on btn to select event
            option.parentNode.style.display = "none"
            return
        }
        arrModel.push(data)
    }
    if (type === "include") {
        console.log('k');
        const isdefault = arrInclude.indexOf(data)
        if (isdefault != -1) {
            const isAlreadyClicked = isSearchedClicked(btnClass, data)

            if (isAlreadyClicked) {
                option.parentNode.style.display = "none"
                return
            }
            getDataAndBtn(btnClass, [data]) //for click event on btn to select event
            option.parentNode.style.display = "none"
            return
        }
        arrInclude.push(data)
    }
    console.log(data);
    option.parentNode.style.display = "none"
        // btn creator starts
    let c
    if (type === "obdii") {
        c = btnDivContentCreatorCross(btnClass, [data])
    }
    if (type === "include") {
        c = btnDivContentCreatorCheck(btnClass, [data])
    }
    if (type === "make") {
        c = btnDivContentCreatorCheck(btnClass, [data])
    }
    if (type === "model") {
        c = btnDivContentCreatorCheck(btnClass, [data])
    }
    document.getElementById(btnContainer).innerHTML = test + c
    if (type === "obdii") {
        document.querySelectorAll('.obdiiissues-type-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                const parentDiv = e.target.parentElement
                if (parentDiv.className === "btn-div obdiiissues-type-btn") {
                    const isclicked = parentDiv.getAttribute('data-isclicked')
                    if (isclicked === "no") {
                        parentDiv.style.backgroundColor = "#E73E3E"
                        parentDiv.style.color = "white"
                        parentDiv.children[0].style.display = "none"
                        parentDiv.children[1].style.display = "inline"
                        userData.CONDITION['OBDII Issues'].push(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "yes");
                    } else {
                        parentDiv.style.backgroundColor = "#EAEAEA"
                        parentDiv.style.color = "black"
                        parentDiv.children[0].style.display = "inline"
                        parentDiv.children[1].style.display = "none"
                        userData.CONDITION['OBDII Issues'].remove(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "no");
                    }

                }
            })
        })
        getDataAndBtn('obdiiissues-type-btn', [data]) //for click event on btn to select event
    }
    if (type === "include") {
        document.querySelectorAll('.include-type-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                const parentDiv = e.target.parentElement
                if (parentDiv.className === "btn-div include-type-btn") {
                    const isclicked = parentDiv.getAttribute('data-isclicked')
                    if (isclicked === "no") {
                        parentDiv.style.backgroundColor = "#0266ff"
                        parentDiv.style.color = "white"
                        parentDiv.children[0].style.display = "none"
                        parentDiv.children[1].style.display = "inline"
                        userData.CONDITION['INCLUDE'].push(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "yes");
                    } else {
                        parentDiv.style.backgroundColor = "#EAEAEA"
                        parentDiv.style.color = "black"
                        parentDiv.children[0].style.display = "inline"
                        parentDiv.children[1].style.display = "none"
                        userData.CONDITION['INCLUDE'].remove(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "no");
                    }

                }
            })
        })
        getDataAndBtn('include-type-btn', [data]) //for click event on btn to select event
    }
    if (type === "make") {
        document.querySelectorAll('.make-type-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                const parentDiv = e.target.parentElement
                if (parentDiv.className === "btn-div make-type-btn") {
                    const isclicked = parentDiv.getAttribute('data-isclicked')
                    if (isclicked === "no") {
                        parentDiv.style.backgroundColor = "#0266ff"
                        parentDiv.style.color = "white"
                        parentDiv.children[0].style.display = "none"
                        parentDiv.children[1].style.display = "inline"
                        userData.VEHICLE['Make'].push(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "yes");
                    } else {
                        parentDiv.style.backgroundColor = "#EAEAEA"
                        parentDiv.style.color = "black"
                        parentDiv.children[0].style.display = "inline"
                        parentDiv.children[1].style.display = "none"
                        userData.VEHICLE['Make'].remove(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "no");
                    }

                }
                validateMakeModelBodyFun()

            })
        })
        getDataAndBtn('make-type-btn', [data]) //for click event on btn to select event
    }
    if (type === "model") {
        document.querySelectorAll('.model-type-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
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
                // validateMakeModelBodyFun()

            })
        })
        console.log('databefore', data);

        getDataAndBtn('model-type-btn', [data]) //for click event on btn to select event
    }
}

const optionHtml = (arr, btnClass, buttonContainer, type) => {
    let contopush = ""
    arr.forEach((val) => {
        const content = Mustache.render($optionTemplate, {
            valueOption: val.trim(),
            btnClass: btnClass,
            btnContainer: buttonContainer,
            type: type
        })
        contopush = contopush + content
    })

    return contopush
}
let removeSeeMoreIncludeFlag = false
const dothis = (value) => {
    console.log(value);
    const token = getCookieFilterHandler('access_token')
    if (value === "obdii") {
        const queryVal = document.getElementById('obdii-searchbar').value
        let bdy = {
            query: queryVal
        }
        bdy = JSON.stringify(bdy)
        createSearchReqObdii(obdiiSearchEndpoint + token, bdy)
    }
    if (value === "include") {
        if (!removeSeeMoreIncludeFlag && mode === "newfilter") {
            showAllFiltersSeemore('includeOptions')
            removeSeeMoreIncludeFlag = true
        }

        const queryVal = document.getElementById('include-searchbar').value
        let bdy = {
            query: queryVal
        }
        bdy = JSON.stringify(bdy)
        createSearchReqInclude(includeSearchEndpoint + token, bdy)
    }
    if (value === "make") {
        const queryVal = document.getElementById('make-searchbar').value
        let bdy = {
                query: queryVal,
                selectedBody: userData.VEHICLE['Body Type'],
                selectedModel: userData.VEHICLE['Model']
            }
            // console.log(bdy);

        bdy = JSON.stringify(bdy)
        createSearchReqMake(makeSearchEndpoint + token, bdy)
    }
    if (value === "model") {
        const queryVal = document.getElementById('model-searchbar').value
        let bdy = {
                query: queryVal,
                selectedBody: userData.VEHICLE['Body Type'],
                selectedMake: userData.VEHICLE['Make']
            }
            // console.log(bdy);
        bdy = JSON.stringify(bdy)

        createSearchReqModel(modelSearchEndpoint + token, bdy)
    }
}
let interval;
const dbQuery = (value) => {
    // console.log('qcalled');

    clearTimeout(interval)
    interval = setTimeout(dothis(value), 500)
}






//const for all types of seaches
const closeSearchBar = () => {
    const ele = document.querySelectorAll('.dropdown-search')
    ele.forEach((e) => {
        e.style.display = "none"

    })
}
const searchbars = document.querySelectorAll('.headerandbutton-container-searchbar')
searchbars.forEach((bar) => {
    const ele = bar.children[0]
    ele.addEventListener('click', (e) => {
        if (ele.value.length > 0) {
            // console.log('here');
            const dropdown = bar.children[1]
            setTimeout(() => {
                dropdown.style.display = "flex"

            }, 1)
        }

    })
})