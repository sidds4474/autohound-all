const fetchFilterEndpoint = "http://68.183.105.196:8080/api/fetchFilter?access_token="
const getInitDataEndpoint = "http://68.183.105.196:8080/api/fetchFilterOptions?access_token="
const saveFilterEndpoint = "http://68.183.105.196:8080/api/saveFilter?access_token="
const getSmsApiEndpoint = "http://68.183.105.196:8080/api/getSMSCount?access_token="
const $plusCheckButtonTemplate = document.getElementById('plus-check-type-btn').innerHTML
const $plusCrossButtonTemplate = document.getElementById('plus-cross-type-btn').innerHTML
let isSmsAllowed
let mode = "newfilter"
let filterId = null
let smsCount = 0
var defaultObdiiOptions = ['Most Common Codes', 'Common Powertrain Codes', 'Common Chassis Codes', 'Common Body Codes', 'Common Network / Computer Codes']
    // conatins pre checked data to avoid dupl
let arrObdii = []
let arrInclude = []
let arrModel = []
let arrMake = []
let arrBody = []
const sanitizeArr = (arr) => {
    let mode = ['trim']
    let temp = []
    arr.forEach((val) => {
        val = val.trim()
        temp.push(val)
    })
    return temp
}


const userDataFilter = {
        AUCTION: {
            'Name': null,
            'Auction / Inspection Type': [],
            'Auction Color': [],
            'Time Remaining': null,
            'Distance': null,
            'States (EXCLUDE)': []
        },
        VEHICLE: {
            'Body Type': [],
            'Drivetrain': [],
            'Transmission': [],
            'Fuel Type': [],
            'Make': [],
            'Reserve Met': [],
            'Model': [],
            'Years': null,
            'Miles / Odometer': null,
            'Max Bid': null,
            'Profit (Minimum)': null
        },
        CONDITION: {
            'ACV Carfax Announcements': [],
            'Driveability Issues': [],
            'Exterior Damage': [],
            'Interior Damage': [],
            'Frame & Unibody Issues': [],
            'Mechanical Issues': [],
            'Warning Lights Issues': [],
            'OBDII Issues': [],
            'Seller Notes': [],
            'Title Issues': [],
            'Wheels & Tires Issues': [],
            'INCLUDE': []
        },
        NOTIFICATION: {
            istrue: null
        }
    }
    //for loading edited data
const afterFetchingFilter = (resData) => {
    // console.log(resData);
    //remove see mores
    if (resData.success) {
        var filterData = resData.filtersResponse
        const keys = Object.keys(filterData)
        const values = Object.values(filterData)
        const numberOfItems = keys.length
        keys.forEach((key, index) => {
            const valueKey = values[index]
                // console.log(key, valueKey);
            if (key === "id") {

                filterId = valueKey

            }
            if (key === "includeNADifference") {
                console.log('in nana', valueKey);
                ischeckedbox = !valueKey
                document.querySelector('.remember-me-checkbox').click()

            }
            if (key === "filterName") {
                userDataFilter.AUCTION['Name'] = valueKey
                userData.AUCTION['Name'] = valueKey
                document.getElementById('filter-name').value = valueKey
                return
            }
            if (key === "inspectionTypes") {
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.AUCTION['Auction / Inspection Type'] = []
                    return
                }
                userDataFilter.AUCTION['Auction / Inspection Type'] = valueKey
                getDataAndBtn('auc-type-btn', valueKey)
                return
            }
            if (key === "color") {
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.AUCTION['Auction Color'] = []
                    return
                }
                userDataFilter.AUCTION['Auction Color'] = valueKey
                getDataAndBtn('color-type-btn', valueKey)
                return
            }
            if (key === "timeRemainingMax") {
                let data = valueKey
                if (valueKey === "") {
                    console.log('here');
                    data = "0"
                }

                userDataFilter.AUCTION['Time Remaining'] = data
                document.getElementById('time-slider').value = data
                singleRangeAdjust(timeSlider, timeSliderrange, timeSliderthumb)
                timeVal.innerHTML = data
                userData.AUCTION['Time Remaining'] = valueKey + " Minutes"
                return
            }
            if (key === "maxDistance") {
                let data = valueKey.trim().toString()
                if (valueKey === "") {
                    console.log('here');
                    data = "0"
                }
                data = data.replace(',', '')
                userDataFilter.AUCTION['Distance'] = data
                const v = arrayOfDistanceValues.indexOf(data)
                    // console.log(v);
                document.getElementById('distance-slider').value = v + 1
                singleRangeAdjust(disSlider, disSliderrange, disSliderthumb)
                disVal.innerHTML = numberWithCommas(data)
                userData.AUCTION['Distance'] = numberWithCommas(data + ' Miles')
                return
            }
            if (key === "state") {
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.AUCTION['States (EXCLUDE)'] = []
                    return
                }
                userDataFilter.AUCTION['States (EXCLUDE)'] = valueKey
                getDataAndBtn('states-exclude-btn', valueKey)
                return
            }
            if (key === "bodyTypes") {
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.VEHICLE['Body Type'] = []
                    return
                }
                userDataFilter.VEHICLE['Body Type'] = valueKey
                getDataAndBtn('body-type-btn', valueKey)
                return
            }
            if (key === "drivetrains") {
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.VEHICLE['Drivetrain'] = []
                    return
                }
                userDataFilter.VEHICLE['Drivetrain'] = valueKey
                getDataAndBtn('drivertrain-type-btn', valueKey)
                return
            }
            if (key === "transmissions") {
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.VEHICLE['Transmission'] = []
                    return
                }
                userDataFilter.VEHICLE['Transmission'] = valueKey
                getDataAndBtn('transmission-type-btn', valueKey)
                return
            }
            if (key === "fuelTypes") {
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.VEHICLE['Fuel Type'] = []
                    return
                }
                userDataFilter.VEHICLE['Fuel Type'] = valueKey
                getDataAndBtn('fuel-type-btn', valueKey)
                return
            }
            if (key === "reserveMet") {
                if (!valueKey) {
                    return
                }
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.VEHICLE['Reserve Met'] = []
                    return
                }
                userDataFilter.VEHICLE['Reserve Met'] = valueKey
                getDataAndBtn('reserve-type-btn', valueKey)
                return
            }
            if (key === "makes") {
                let data = valueKey
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.VEHICLE['Make'] = []
                    return
                }
                userDataFilter.VEHICLE['Make'] = valueKey
                data.forEach((v) => {
                    let isPresent = arrMake.indexOf(v)
                    if (isPresent === -1) {
                        arrMake.push(v)
                        const html = btnDivContentCreatorCheck('make-type-btn', [v])
                        let prevHtml = document.getElementById('makeOptions').innerHTML
                        prevHtml = prevHtml + html
                        document.getElementById('makeOptions').innerHTML = prevHtml
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
                                        parentDiv.setAttribute("data-isclicked", "no")
                                    }
                                }
                                validateMakeModelBodyFun()

                            })
                        })
                    }
                })
                getDataAndBtn('make-type-btn', valueKey)
                return
            }
            if (key === "models") {
                let data = valueKey
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.VEHICLE['Model'] = []
                    return
                }
                userDataFilter.VEHICLE['Model'] = valueKey
                data.forEach((v) => {
                    let isPresent = arrModel.indexOf(v)
                    if (isPresent === -1) {
                        arrModel.push(v)
                        const html = btnDivContentCreatorCheck('model-type-btn', [v])
                        let prevHtml = document.getElementById('modelOptions').innerHTML
                        prevHtml = prevHtml + html
                        document.getElementById('modelOptions').innerHTML = prevHtml
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
                                        parentDiv.setAttribute("data-isclicked", "no")
                                    }
                                }
                                validateMakeModelBodyFun()

                            })
                        })
                    }
                })
                getDataAndBtn('model-type-btn', valueKey)
                return
            }
            if (key === "yearMin") {
                const data = valueKey.toString()
                console.log(data, 'ymin');
                userDataFilter.VEHICLE['Years'] = data
                inputLeftYear.value = data
                yearmin.innerHTML = inputLeftYear.value
                userData.VEHICLE['Years'] = inputLeftYear.value + ' - ' + inputRightYear.value
                setLeftValue(inputLeftYear, inputRightYear, thumbLeftYear, thumbRightYear, rangeYear);
                return
            }
            if (key === "yearMax") {
                const data = valueKey.toString().trim()
                userDataFilter.VEHICLE['Years'] = data
                inputRightYear.value = data
                setRightYearValue()
                setRightValue(inputLeftYear, inputRightYear, thumbLeftYear, thumbRightYear, rangeYear)
                return
            }
            if (key === "milesMin") {
                let data = valueKey.replace(',', '')
                data = data.split(' ')[0]
                if (valueKey === "") {
                    console.log('here');
                    data = "0"
                }
                console.log(data, 'mmin');
                userDataFilter.VEHICLE['Miles / Odometer'] = data
                inputLeftDis.value = data
                milesmin.innerHTML = numberWithCommas(inputLeftDis.value)
                userData.VEHICLE['Miles / Odometer'] = numberWithCommas(inputLeftDis.value) + ' - ' + numberWithCommas(inputRightDis.value)
                setLeftValue(inputLeftDis, inputRightDis, thumbLeftDis, thumbRightDis, rangeDis, 'dis')
                return
            }
            if (key === "milesMax") {
                let data = valueKey
                if (data === "200,000 +") {
                    console.log('here');
                    data = "205000"
                } else if (data === "") {
                    console.log('here');
                    data = "200000"
                } else {
                    data = data.replace(',', '')
                    data = data.split(' ')[0]
                }
                userDataFilter.VEHICLE['Miles / Odometer'] = data
                inputRightDis.value = data
                setRightDisValue()
                setRightValue(inputLeftDis, inputRightDis, thumbLeftDis, thumbRightDis, rangeDis, 'dis')
                return
            }
            if (key === "currentBidMax") {
                let data = valueKey
                if (data === "50,000 +") {
                    console.log('here');
                    data = "50500"
                } else if (data === "") {
                    console.log('here');
                    data = "0"
                } else {
                    data = data.replace(',', '')
                    data = data.split(' ')[0]
                }

                console.log(data);

                userDataFilter.VEHICLE['Max Bid'] = data

                maxbidSlider.value = parseInt(data)
                setMaxBidData()
                singleRangeAdjust(maxbidSlider, maxbidSliderrange, maxbidSliderthumb)
                return
            }
            if (key === "profitMin") {
                let data = valueKey
                if (data === "10,000 +") {
                    console.log('here');
                    data = "10500"
                } else if (data === "") {
                    console.log('here');
                    data = "0"
                } else {
                    data = data.replace(',', '')
                    data = data.split(' ')[0]
                    data.trim()
                }

                userDataFilter.VEHICLE['Profit (Minimum)'] = data
                profitslider.value = data
                setProfitData()
                singleRangeAdjust(profitslider, profitsliderrange, profitsliderthumb)
                return
            }
            if (key === "includeNADifference") {
                console.log('fix this');
                return
            }
            if (key === "excludeFilters") {
                const k = Object.keys(valueKey)
                const v = Object.values(valueKey)
                k.forEach((key, index) => {
                    // console.log(key, v[index]);
                    let data = v[index]
                    if (key === "acvCarFaxAnnouncements") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['ACV Carfax Announcements'] = []
                            return
                        }
                        userDataFilter.CONDITION['ACV Carfax Announcements'] = data
                        getDataAndBtn('announcement-type-btn', data)
                        return
                    }
                    if (key === "driveabilityIssues") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['Driveability Issues'] = []
                            return
                        }
                        userDataFilter.CONDITION['Driveability Issues'] = data
                        getDataAndBtn('driveability-issues-type-btn', data)
                        return
                    }
                    if (key === "exteriorIssues") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['Exterior Damage'] = []
                            return
                        }
                        userDataFilter.CONDITION['Exterior Damage'] = data
                        getDataAndBtn('exdamage-type-btn', data)
                        return
                    }
                    if (key === "interiorIssues") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['Interior Damage'] = []
                            return
                        }
                        userDataFilter.CONDITION['Interior Damage'] = data
                        getDataAndBtn('indamage-type-btn', data)
                        return
                    }
                    if (key === "frameUnibodyIssues") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['Frame & Unibody Issues'] = []
                            return
                        }
                        userDataFilter.CONDITION['Frame & Unibody Issues'] = data
                        getDataAndBtn('framesandunibodyissues-type-btn', data)
                        return
                    }
                    if (key === "mechanicalIssues") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['Mechanical Issues'] = []
                            return
                        }
                        userDataFilter.CONDITION['Mechanical Issues'] = data
                        getDataAndBtn('mechissues-type-btn', data)
                        return
                    }
                    if (key === "warningLightsIssues") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['Warning Lights Issues'] = []
                            return
                        }
                        userDataFilter.CONDITION['Warning Lights Issues'] = data
                        getDataAndBtn('lightissues-type-btn', data)
                        return
                    }
                    if (key === "obdiiCodes") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['OBDII Issues'] = []
                            return
                        }
                        userDataFilter.CONDITION['OBDII Issues'] = data
                        console.log(data, 'obdii');
                        data.forEach((v) => {
                            let isPresent = arrObdii.indexOf(v)
                            if (isPresent === -1) {
                                arrObdii.push(v)
                                const html = btnDivContentCreatorCross('obdiiissues-type-btn', [v])
                                let prevHtml = document.getElementById('obdiiOptions').innerHTML
                                prevHtml = prevHtml + html
                                document.getElementById('obdiiOptions').innerHTML = prevHtml
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
                            }
                        })

                        console.log('till');

                        getDataAndBtn('obdiiissues-type-btn', data)
                        return
                    }
                    if (key === "sellerNotes") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['Seller Notes'] = []
                            return
                        }
                        userDataFilter.CONDITION['Seller Notes'] = data
                        getDataAndBtn('sellernotes-type-btn', data)
                        return
                    }
                    if (key === "titleHistoryNotes") {
                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['Title Issues'] = []
                            return
                        }
                        userDataFilter.CONDITION['Title Issues'] = data
                        getDataAndBtn('tittleissues-type-btn', data)
                        return
                    }
                    if (key === "wheelsTiresIssues") {

                        if (data.length == 1 && data[0] === "") {
                            userDataFilter.CONDITION['Wheels & Tires Issues'] = []
                            return
                        }
                        userDataFilter.CONDITION['Wheels & Tires Issues'] = data
                        getDataAndBtn('wheelandtiresissues-type-btn', data)
                        return
                    }
                })
            }
            if (key === "includeOptions") {
                if (valueKey.length == 1 && valueKey[0] === "") {
                    userDataFilter.CONDITION['INCLUDE'] = []
                    return
                }
                userDataFilter.CONDITION['INCLUDE'] = valueKey
                    // console.log('include', valueKey);
                valueKey.forEach((v) => {
                    const isPresent = arrInclude.indexOf(v)
                    if (isPresent === -1) {
                        arrInclude.push(v)
                        const html = btnDivContentCreatorCheck('include-type-btn', [v])
                        let prevHtml = document.getElementById('includeOptions').innerHTML
                        prevHtml += html
                        document.getElementById('includeOptions').innerHTML = prevHtml
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
                    }
                })
                getDataAndBtn('include-type-btn', valueKey)
                return
            }
            if (key === "receiveNotification") {
                let isIT = ""
                if (valueKey) {
                    isIT = "Yes"
                    document.getElementById('yes-notify').children[2].click()
                } else {
                    isIT = "No"
                    document.getElementById('yes-notify').children[2].click()
                    document.getElementById('no-notification').click()
                }
                userDataFilter.NOTIFICATION.istrue = isIT
                userData.NOTIFICATION.istrue = isIT
                return
            }
        })
    }
    document.querySelector('html').style.display = "initial"

}

const getCookieFilterHandler = (key) => {
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

const createReqFE = async(url, data) => {
    // console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    })
    const res_data = await res.json()
    console.log(res_data);
    afterFetchingFilter(res_data)

}
const getInitialDataPromise = (url) => {
    return new Promise((res, rej) => {
        const data = getInitialData(url)
        if (data) {
            res(data)
        } else {
            rej('failed to fetch')
        }
    })
}
const getInitialData = async(url) => {
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        const res_data = await res.json()
        if (res_data.status && res_data.message === "Success") {
            return initializeBtns(res_data)
        } else {
            alert('ERROR:CANT FETCH INITIALS')
        }
    }
    //filter handler this part is crucial , hard to do and important

const fetchFilterDataById = async() => {
    let url = window.location.href
    const fData = url.split('?')[1]
    console.log(fData);
    document.getElementById('filterNum').innerText = "Filter #" + filterNum
    document.getElementById('review-filter-num').innerText = "Review Filter #" + filterNum
    const token = getCookieFilterHandler('access_token')
    if (fData) {
        const data = await getInitialDataPromise(getInitDataEndpoint + token)
        console.log(data);
        //remove see more
        mode = "edit"
        showAllFiltersSeemore('acvCarfaxAnnouncements')
        showAllFiltersSeemore('exteriorDamages')
        showAllFiltersSeemore('interiorDamages')
        showAllFiltersSeemore('mechanicalIssues')
        showAllFiltersSeemore('includeOptions')
        document.querySelectorAll('.mode-filter').forEach((ele) => {
            ele.innerText = "Edit Filter"
        })
        createReqFE(fetchFilterEndpoint + token, fData)
    } else {
        const data = await getInitialDataPromise(getInitDataEndpoint + token)
        console.log(data);

    }
}
const getDataAndBtn = (clsname, values) => {
    // console.log(values, typeof values);
    clsname = "." + clsname
    const btns = document.querySelectorAll(clsname)
    btns.forEach((btn) => {

        let value = btn.children[2].innerText.trim()
            // console.log(values, value);
        value = value.replace('&amp;', '&')
        const isPresentInd = values.indexOf(value)
        if (isPresentInd != -1) {
            // console.log(isPresentInd, btn);
            btn.children[2].click()
        }
    })
}

const showAllFiltersSeemore = (key) => {
    let childs = document.getElementById(key).children
    childs = [].slice.call(childs)
    childs.forEach((ele) => {
        ele.style.display = "inline-flex"
    })
    childs[childs.length - 1].style.display = "none"
}

const seeMoreMax = 6
const setSeeMoreFiltersAccToSeeMax = (key) => {
    let childs = document.getElementById(key).children
    childs = [].slice.call(childs)
    const al = childs.length
    childs = childs.slice(seeMoreMax, childs.length)
        // console.log(childs);
    childs.forEach((ele) => {
        ele.style.display = "none"
    })
    const diffF = al - seeMoreMax
    if (diffF <= 0) {
        return ""
    }
    const seeMoreHtml = `<span onclick=showAllFiltersSeemore('${key}') class="seeMoreBtn" style="top: 9px;position: relative;color: #0266ff; font-size:12px; margin-left:10px;cursor:pointer; font-weight:bold;">see more (${diffF})</span> `
    return seeMoreHtml

}

const initializeBtns = (data) => {
    const filterOptionObj = data.filterOptions
    isSmsAllowed = data.smsallowed
        // console.log(filterOptionObj);
    const keys = Object.keys(filterOptionObj)
    const valuesOfFilter = Object.values(filterOptionObj)
    keys.forEach((key, index) => {
        // console.log(key);
        if (key === "auctionInspectionType") {
            const c = btnDivContentCreatorCheck('auc-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "auctionColor") {
            const c = btnDivContentCreatorCheck('color-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
                // const sm = setSeeMoreFiltersAccToSeeMax(key)
                // document.getElementById(key).insertAdjacentHTML('beforeend', sm)

            return
        }
        if (key === "states") {
            const c = btnDivContentCreatorCross('states-exclude-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "bodyTypes") {
            const c = btnDivContentCreatorCheck('body-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
                // const sm = setSeeMoreFiltersAccToSeeMax(key)
                // document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            arrBody = valuesOfFilter[index]
            return
        }
        if (key === "drivetrain") {
            const c = btnDivContentCreatorCheck('drivertrain-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
                // const sm = setSeeMoreFiltersAccToSeeMax(key)
                // document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "transmission") {
            const c = btnDivContentCreatorCheck('transmission-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "fuelType") {
            const c = btnDivContentCreatorCheck('fuel-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "acvCarfaxAnnouncements") {
            const c = btnDivContentCreatorCross('announcement-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "driveabilityIssues") {
            const c = btnDivContentCreatorCross('driveability-issues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "exteriorDamages") {
            const c = btnDivContentCreatorCross('exdamage-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "interiorDamages") {
            const c = btnDivContentCreatorCross('indamage-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "frameUnibodyIssues") {
            const c = btnDivContentCreatorCross('framesandunibodyissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "mechanicalIssues") {
            const c = btnDivContentCreatorCross('mechissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "warningLightsIssues") {
            const c = btnDivContentCreatorCross('lightissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
                // const sm = setSeeMoreFiltersAccToSeeMax(key)
                // document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "sellerNotes") {
            const c = btnDivContentCreatorCross('sellernotes-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
                // const sm = setSeeMoreFiltersAccToSeeMax(key)
                // document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "titleIssues") {
            const c = btnDivContentCreatorCross('tittleissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
                // const sm = setSeeMoreFiltersAccToSeeMax(key)
                // document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "wheelsAndTiresIssues") {
            const c = btnDivContentCreatorCross('wheelandtiresissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
                // const sm = setSeeMoreFiltersAccToSeeMax(key)
                // document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "includeDefaultOptions") {
            const c = btnDivContentCreatorCheck('include-type-btn', valuesOfFilter[index])
            document.getElementById('includeOptions').innerHTML = c
            arrInclude = valuesOfFilter[index]
            const sm = setSeeMoreFiltersAccToSeeMax('includeOptions')
            document.getElementById('includeOptions').insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "obdiiDefaultOptions") {
            const c = btnDivContentCreatorCross('obdiiissues-type-btn', valuesOfFilter[index])
            document.getElementById('obdiiOptions').innerHTML = c
            arrObdii = sanitizeArr(valuesOfFilter[index])
                // const sm = setSeeMoreFiltersAccToSeeMax(key)
                // document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "makeDefaultOptions") {
            const c = btnDivContentCreatorCheck('make-type-btn', valuesOfFilter[index])
            document.getElementById('makeOptions').innerHTML = c
            arrMake = valuesOfFilter[index]

            // const sm = setSeeMoreFiltersAccToSeeMax(key)
            // document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }

        if (key === "modelDefaultOptions") {
            const c = btnDivContentCreatorCheck('model-type-btn', valuesOfFilter[index])
            document.getElementById('modelOptions').innerHTML = c
            arrModel = valuesOfFilter[index]

            // const sm = setSeeMoreFiltersAccToSeeMax(key)
            // document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }

    })
    initBtnSelection()
    console.log(data);
    //setting max year
    inputRightDis.value = "130000"
    setRightDisValue()
    setRightValue(inputLeftDis, inputRightDis, thumbLeftDis, thumbRightDis, rangeDis)
    document.getElementById('no-notification').click()
    document.querySelector('html').style.display = "initial"
    return true
}
const popModalOnNoti = () => {
    if (!isSmsAllowed) {

        modalVerifyNumber()
    } else {
        document.getElementById('estimation-div-right-review').innerHTML = '<div class="loader-small"></div>'
    }


}

const btnDivContentCreatorCheck = (classNm, data) => {
    let inHtml = ""
    data.forEach((val) => {
        const content = Mustache.render($plusCheckButtonTemplate, {
            classType: classNm,
            name: encoderForDiv(val)
        })
        inHtml = inHtml + content
    })
    return inHtml
}
const btnDivContentCreatorCross = (classNm, data) => {
    let inHtml = ""
    data.forEach((val) => {
        const content = Mustache.render($plusCrossButtonTemplate, {
            classType: classNm,
            name: val
        })
        inHtml = inHtml + content
    })
    return inHtml
}
const createReqSmsGet = async(url, data) => {
    console.log('fetching sms count initiated');

    // console.log(data);
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
    if (res_data.error) {
        alert('ERROR FETCHING SMS COUNT')
    } else {
        smsCount = res_data.numberOfSMSPerDay
        document.getElementById('senstivityLevel').innerHTML = res_data.sensitivityLevel
        document.getElementById('estimation-div-right-review').innerHTML = smsCount
        document.getElementById('confirm-btn').removeAttribute('disabled')
    }

}
var toSaveObj = {
    id: filterId,
    excludeFilters: {}
}

const saveFilter = (isSms) => { //creates toSaveObj for saving apis()
    const keyValues = Object.values(userData)
        // console.log(keyValues);
    keyValues.forEach((key) => {
        const keyOfObj = Object.keys(key)
        const valOfKeyArr = Object.values(key)
        keyOfObj.forEach((eleKey, index) => {
            let valueOfKey = valOfKeyArr[index]
                // console.log(eleKey, valueOfKey)
            if (!valueOfKey) {
                valueOfKey = ""
            }

            if (eleKey === "Name") {
                toSaveObj.filterName = valueOfKey
                return
            }
            if (eleKey === "Auction / Inspection Type") {
                toSaveObj.inspectionTypes = valueOfKey

                return
            }
            if (eleKey === "Auction Color") {
                toSaveObj.color = valueOfKey
                return
            }
            if (eleKey === "Time Remaining") {
                toSaveObj.timeRemainingMax = valueOfKey.split(' ')[0]

                return
            }
            if (eleKey === "Distance") {
                toSaveObj.maxDistance = valueOfKey.split(' ')[0]

                return
            }
            if (eleKey === "States (Exclude)") {
                toSaveObj.state = valueOfKey

                return
            }
            if (eleKey === "Body Type") {
                toSaveObj.bodyTypes = valueOfKey

                return
            }
            if (eleKey === "Drivetrain") {
                toSaveObj.drivetrains = valueOfKey

                return
            }
            if (eleKey === "Transmission") {
                toSaveObj.transmissions = valueOfKey

                return
            }
            if (eleKey === "Fuel Type") {
                toSaveObj.fuelTypes = valueOfKey

                return
            }
            if (eleKey === "Make") {
                toSaveObj.makes = valueOfKey

                return
            }
            if (eleKey === "Reserve Met") {
                let x = null
                if (valOfKeyArr[0] === "Yes") {
                    x = "Yes"
                } else {
                    x = "No"
                }
                toSaveObj.reserveMet = x

                return
            }
            if (eleKey === "Model") {
                toSaveObj.models = valueOfKey

                return
            }
            if (eleKey === "Years") {
                if (valueOfKey === "") {
                    return
                }
                const y = valueOfKey.split('-')
                toSaveObj.yearMin = y[0].trim()
                toSaveObj.yearMax = y[1].trim()

                return
            }
            if (eleKey === "Miles / Odometer") {
                if (valueOfKey === "") {
                    return
                }
                const y = valueOfKey.split('-')
                toSaveObj.milesMin = y[0].trim()
                toSaveObj.milesMax = y[1].trim()

                return
            }
            if (eleKey === "Max Bid") {
                toSaveObj.currentBidMax = valueOfKey.slice(1, valueOfKey.length)

                return
            }
            if (eleKey === "Profit (Minimum)") {
                toSaveObj.profitMin = valueOfKey.slice(1, valueOfKey.length)

                return
            }
            if (eleKey === "ACV Carfax Announcements") {
                toSaveObj.excludeFilters.acvCarFaxAnnouncements = valueOfKey

                return
            }
            if (eleKey === "Driveability Issues") {
                toSaveObj.excludeFilters.driveabilityIssues = valueOfKey

                return
            }
            if (eleKey === "Exterior Damage") {
                toSaveObj.excludeFilters.exteriorIssues = valueOfKey

                return
            }
            if (eleKey === "Interior Damage") {
                toSaveObj.excludeFilters.interiorIssues = valueOfKey

                return
            }
            if (eleKey === "Frame & Unibody Issues") {
                toSaveObj.excludeFilters.frameUnibodyIssues = valueOfKey

                return
            }
            if (eleKey === "Mechanical Issues") {
                toSaveObj.excludeFilters.mechanicalIssues = valueOfKey

                return
            }
            if (eleKey === "Warning Lights Issues") {
                toSaveObj.excludeFilters.warningLightsIssues = valueOfKey

                return
            }
            if (eleKey === "OBDII Issues") {
                toSaveObj.excludeFilters.obdiiCodes = valueOfKey

                return
            }
            if (eleKey === "Seller Notes") {
                toSaveObj.excludeFilters.sellerNotes = valueOfKey

                return
            }
            if (eleKey === "Title Issues") {
                toSaveObj.excludeFilters.titleHistoryNotes = valueOfKey

                return
            }
            if (eleKey === "Wheels & Tires Issues") {
                toSaveObj.excludeFilters.wheelsTiresIssues = valueOfKey

                return
            }
            if (eleKey === "INCLUDE") {
                toSaveObj.includeOptions = valueOfKey

                return
            }
            if (eleKey === "istrue") {
                let bool = false
                if (valueOfKey === "Yes") {
                    bool = true
                }
                if (valueOfKey === "No") {
                    bool = false
                }
                toSaveObj.receiveNotification = bool
                return
            }

        })
    })
    toSaveObj.includeNADifference = ischeckedbox
    toSaveObj.id = filterId
    if (isSms) {
        const token = getCookieFilterHandler('access_token')
        const data = JSON.stringify(toSaveObj)
        createReqSmsGet(getSmsApiEndpoint + token, data)
    } else {
        document.getElementById('senstivityLevel').innerHTML = "N/A"
        document.getElementById('estimation-div-right-review').innerHTML = "N/A"
    }

}
const createReqSaveFilter = async() => {

    const token = getCookieFilterHandler('access_token')
    const data = JSON.stringify(toSaveObj)
    console.log(toSaveObj);

    const url = saveFilterEndpoint + token
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
        window.location.href = "../index.html?filter"
    } else {
        alert('failed')
    }
}