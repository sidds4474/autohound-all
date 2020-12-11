const obdiiSearchEndpoint = "http://68.183.105.196:8080/api/searchOBDII?access_token="
const $optionTemplate = document.getElementById('searchbar-option-template').innerHTML
const searchheader = "Search...."

const createSearchReq = async(url, data) => {
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
    const arr = res_data.obdiiOptions.slice(0, 31)
        // console.log(arr);
    let optns = optionHtml(arr, 'obdiiOptions')
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

const isSearchedClicked = (classNameOfBtn, name) => {
    var res
    const btns = document.querySelectorAll("." + classNameOfBtn)
    btns.forEach((btn) => {
        const val = btn.children[2].innerHTML.trim()
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

var arr = ['Most Common Codes', 'Common Powertrain Codes', 'Common Chassis Codes', 'Common Body Codes', 'Common Network / Computer Codes']
const insertValueInDiv = (e) => {
    const test = document.getElementById('obdiiOptions').innerHTML
    const option = e.target
    let data = option.innerHTML
    data.toString()
    data.trim()
    const isdefault = arr.indexOf(data)
    if (isdefault != -1) {
        const isAlreadyClicked = isSearchedClicked('obdiiissues-type-btn', data)

        if (isAlreadyClicked) {
            option.parentNode.style.display = "none"
            return
        }
        getDataAndBtn('obdiiissues-type-btn', data) //for click event on btn to select event
        option.parentNode.style.display = "none"
        return
    }
    arr.push(data)
    console.log(data);
    arr.push(data)
    option.parentNode.style.display = "none"
    const c = btnDivContentCreatorCross('obdiiissues-type-btn', [data])
    document.getElementById('obdiiOptions').innerHTML = test + c
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
                    userData.CONDITION['OBDII Issues'].push(parentDiv.children[2].innerHTML)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['OBDII Issues'].remove(parentDiv.children[2].innerHTML)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
        })
    })
    getDataAndBtn('obdiiissues-type-btn', data) //for click event on btn to select event
}
const optionHtml = (arr, parent) => {
    let contopush = ""
    arr.forEach((val) => {
        const content = Mustache.render($optionTemplate, {
            valueOption: val.trim(),
            parent: parent
        })
        contopush = contopush + content
    })

    return contopush
}


const dothis = () => {
    const queryVal = document.getElementById('obdii-searchbar').value
    const token = getCookieFilterHandler('access_token')
    let bdy = {
        query: queryVal
    }
    bdy = JSON.stringify(bdy)
    createSearchReq(obdiiSearchEndpoint + token, bdy)
}
let interval;
const dbQuery = () => {
    clearTimeout(interval)
    interval = setTimeout(dothis, 300)
}

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

            }, 50)
        }

    })
})