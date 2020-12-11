// window.onbeforeunload = function() { return "Your work will be lost."; }
const filterNum = localStorage.getItem('lastActiveFilter')
var userData = {
    AUCTION: {
        'Name': null,
        'Auction / Inspection Type': [],
        'Auction Color': [],
        'Time Remaining': '8 Minutes',
        'Distance': '300 Miles',
        'States (Exclude)': []
    },
    VEHICLE: {
        'Body Type': [],
        'Drivetrain': [],
        'Transmission': [],
        'Fuel Type': [],
        'Make': [],
        'Reserve Met': [],
        'Model': [],
        'Years': '2000 - 2021',
        'Miles / Odometer': '0 - 130,000',
        'Max Bid': '$30,000',
        'Profit (Minimum)': '$0'
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


const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const showUserData = () => {
    const userDataJson = JSON.stringify(userData)
    alert(userDataJson)

}

document.querySelector('#filter-name').oninput = function() {
    userData.AUCTION['Name'] = this.value


}

const singleRangeAdjust = (slider, range, thumb, type) => {
    const errl = 0.75
    const errr = 0.85
    const err = 2
    var val = slider.value
    var min = slider.min
    var max = slider.max
    max = max - min
    val = val - min
    min = 0

    var widthpercent = (val / (max - min)) * 100
    if (type === "dis" && widthpercent >= 95) {
        console.log('oiin ds');
        widthpercent = widthpercent - 2.3
    } else {
        if (widthpercent >= 95) {
            widthpercent = widthpercent - 2.9
        } else if (widthpercent >= 80) {
            widthpercent = widthpercent - 2
        } else if (widthpercent >= 70) {
            widthpercent = widthpercent - errr
        } else if (widthpercent >= 50) {
            widthpercent = widthpercent - errr
        } else if (widthpercent >= 40) {
            widthpercent = widthpercent - 1

        } else if (widthpercent <= 10) {
            widthpercent = widthpercent + 1.5
        } else {
            widthpercent = widthpercent + errl
        }
    }
    range.style.width = widthpercent + '%'
    thumb.style.left = widthpercent + '%'
}
const profitslider = document.getElementById('profit-slider')
const profitsliderthumb = document.getElementById('profit-slider-thumb')
const profitsliderrange = document.getElementById('profit-slider-range')

singleRangeAdjust(profitslider, profitsliderrange, profitsliderthumb)
profitslider.addEventListener('input', () => {
    singleRangeAdjust(profitslider, profitsliderrange, profitsliderthumb)

})
const profitVal = document.getElementById('profit-data')
profitVal.innerHTML = numberWithCommas(profitslider.value)

const setProfitData = () => {
    let v = profitslider.value
    if (v > 10000) {
        v = "10000 +"
    }
    if (v == 0) {
        v = '-'
    }
    profitVal.innerHTML = numberWithCommas(v)
    userData.VEHICLE['Profit (Minimum)'] = numberWithCommas('$' + v)
}

profitslider.oninput = function() {
    let v = this.value
    if (v > 10000) {
        v = "10000 +"
    }
    if (v == 0) {
        v = '-'
    }
    profitVal.innerHTML = numberWithCommas(v)
    userData.VEHICLE['Profit (Minimum)'] = numberWithCommas('$' + v)
}
profitslider.addEventListener('mouseover', () => {
    profitVal.style.backgroundColor = "white"
    profitVal.style.borderColor = "#0266ff"
})
profitslider.addEventListener('mouseout', () => {
    profitVal.style.backgroundColor = "#f2f2f2"
    profitVal.style.borderColor = "white"
})
profitslider.addEventListener('touchstart', () => {
    profitVal.style.backgroundColor = "white"
    profitVal.style.borderColor = "#0266ff"
})
profitslider.addEventListener('touchend', () => {
    profitVal.style.backgroundColor = "#f2f2f2"
    profitVal.style.borderColor = "white"
})

//max bid begin
const maxbidSlider = document.querySelector("#max-bid-slider");
const maxbidVal = document.querySelector("#max-bid-data");
const maxbidSliderthumb = document.getElementById('max-bid-slider-thumb')
const maxbidSliderrange = document.getElementById('max-bid-slider-range')
maxbidVal.innerHTML = numberWithCommas(maxbidSlider.value)

singleRangeAdjust(maxbidSlider, maxbidSliderrange, maxbidSliderthumb)
maxbidSlider.addEventListener('input', () => {
    singleRangeAdjust(maxbidSlider, maxbidSliderrange, maxbidSliderthumb)

})
const setMaxBidData = () => {
    let v = maxbidSlider.value
    if (v > 50000) {
        v = "50000 +"
    }
    maxbidVal.innerHTML = numberWithCommas(v)
    userData.VEHICLE['Max Bid'] = numberWithCommas('$' + v)

}
maxbidSlider.oninput = function() {
    let v = this.value
    if (v > 50000) {
        v = "50000 +"
    }
    maxbidVal.innerHTML = numberWithCommas(v)
    userData.VEHICLE['Max Bid'] = numberWithCommas('$' + v)

}
maxbidSlider.addEventListener('mouseover', () => {
    maxbidVal.style.backgroundColor = "white"
    maxbidVal.style.borderColor = "#0266ff"
})
maxbidSlider.addEventListener('mouseout', () => {
    maxbidVal.style.backgroundColor = "#f2f2f2"
    maxbidVal.style.borderColor = "white"
})
maxbidSlider.addEventListener('touchstart', () => {
    maxbidVal.style.backgroundColor = "white"
    maxbidVal.style.borderColor = "#0266ff"
})
maxbidSlider.addEventListener('touchend', () => {
    maxbidVal.style.backgroundColor = "#f2f2f2"
    maxbidVal.style.borderColor = "white"
})

//distance slider
const disSlider = document.querySelector("#distance-slider");
const disVal = document.querySelector("#distance-data");
const disSliderrange = document.getElementById('distance-slider-range')
const disSliderthumb = document.getElementById('distance-slider-thumb')
const arrayOfDistanceValues = ['-', '25', '50', '100', '200', '300', '500', '750', '1000', '1000+']
disVal.innerHTML = numberWithCommas(arrayOfDistanceValues[5])

singleRangeAdjust(disSlider, disSliderrange, disSliderthumb, 'dis')
disSlider.addEventListener('input', () => {
    singleRangeAdjust(disSlider, disSliderrange, disSliderthumb, 'dis')

})

disSlider.oninput = function() {
    let index = (this.value - 1)
    disVal.innerHTML = numberWithCommas(arrayOfDistanceValues[index])
    userData.AUCTION['Distance'] = numberWithCommas(arrayOfDistanceValues[index] + ' Miles')
}
disSlider.addEventListener('mouseover', () => {
    disVal.style.backgroundColor = "white"
    disVal.style.borderColor = "#0266ff"
})
disSlider.addEventListener('mouseout', () => {
    disVal.style.backgroundColor = "#f2f2f2"
    disVal.style.borderColor = "white"
})
disSlider.addEventListener('touchstart', () => {
    disVal.style.backgroundColor = "white"
    disVal.style.borderColor = "#0266ff"
})
disSlider.addEventListener('touchend', () => {
    disVal.style.backgroundColor = "#f2f2f2"
    disVal.style.borderColor = "white"
})



const timeSlider = document.querySelector("#time-slider");
const timeVal = document.querySelector("#time-data");
const timeSliderrange = document.getElementById('time-slider-range')
const timeSliderthumb = document.getElementById('time-slider-thumb')

timeVal.innerHTML = timeSlider.value


singleRangeAdjust(timeSlider, timeSliderrange, timeSliderthumb)
timeSlider.addEventListener('input', () => {
    singleRangeAdjust(timeSlider, timeSliderrange, timeSliderthumb)

})
timeSlider.oninput = function() {
    timeVal.innerHTML = this.value
    userData.AUCTION['Time Remaining'] = this.value + ' Minutes'

}
timeSlider.addEventListener('touchstart', () => {
    timeVal.style.backgroundColor = "white"
    timeVal.style.borderColor = "#0266ff"
})
timeSlider.addEventListener('touchend', () => {
    timeVal.style.backgroundColor = "#f2f2f2"
    timeVal.style.borderColor = "white"
})
timeSlider.addEventListener('mouseover', () => {
    timeVal.style.backgroundColor = "white"
    timeVal.style.borderColor = "#0266ff"
})
timeSlider.addEventListener('mouseout', () => {
    timeVal.style.backgroundColor = "#f2f2f2"
    timeVal.style.borderColor = "white"
})






// page 2 functions



var inputLeftYear = document.querySelector('#input-left-year')
inputLeftYear.setAttribute('max', new Date().getFullYear() + 1)
var inputRightYear = document.querySelector('#input-right-year')
inputRightYear.setAttribute('max', new Date().getFullYear() + 1)
var thumbLeftYear = document.querySelector('#thumb-left-year')
var thumbRightYear = document.querySelector('#thumb-right-year')
var rangeYear = document.querySelector('#range-year')
var inputLeftDis = document.querySelector('#input-left-dis')
var inputRightDis = document.querySelector('#input-right-dis')
var thumbLeftDis = document.querySelector('#thumb-left-dis')
var thumbRightDis = document.querySelector('#thumb-right-dis')
var rangeDis = document.querySelector('#range-dis')
var yearmin = document.getElementById('year-data-min')
var yearmax = document.getElementById('year-data-max')
var milesmin = document.getElementById('miles-data-min')
var milesmax = document.getElementById('miles-data-max')
yearmin.innerHTML = (inputLeftYear.value)
yearmax.innerHTML = (inputRightYear.value)
milesmin.innerHTML = numberWithCommas(inputLeftDis.value)
milesmax.innerHTML = numberWithCommas(inputRightDis.value)


inputLeftYear.addEventListener('touchstart', () => {
    yearmin.style.backgroundColor = "white"
    yearmin.style.borderColor = "#0266ff"

})
inputLeftYear.addEventListener('touchend', () => {
    yearmin.style.backgroundColor = "#f2f2f2"
    yearmin.style.borderColor = "#ffffff"

})
inputRightYear.addEventListener('touchstart', () => {
    yearmax.style.backgroundColor = "white"
    yearmax.style.borderColor = "#0266ff"

})
inputRightYear.addEventListener('touchend', () => {
    yearmax.style.backgroundColor = "#f2f2f2"
    yearmax.style.borderColor = "#ffffff"

})

inputLeftDis.addEventListener('touchstart', () => {
    milesmin.style.backgroundColor = "white"
    milesmin.style.borderColor = "#0266ff"

})
inputLeftDis.addEventListener('touchend', () => {
    milesmin.style.backgroundColor = "#f2f2f2"
    milesmin.style.borderColor = "#ffffff"

})
inputRightDis.addEventListener('touchstart', () => {
    milesmax.style.backgroundColor = "white"
    milesmax.style.borderColor = "#0266ff"

})
inputRightDis.addEventListener('touchend', () => {
    milesmax.style.backgroundColor = "#f2f2f2"
    milesmax.style.borderColor = "#ffffff"

})
inputLeftYear.addEventListener('mouseover', () => {
    yearmin.style.backgroundColor = "white"
    yearmin.style.borderColor = "#0266ff"

})
inputLeftYear.addEventListener('mouseout', () => {
    yearmin.style.backgroundColor = "#f2f2f2"
    yearmin.style.borderColor = "#ffffff"

})
inputRightYear.addEventListener('mouseover', () => {
    yearmax.style.backgroundColor = "white"
    yearmax.style.borderColor = "#0266ff"

})
inputRightYear.addEventListener('mouseout', () => {
    yearmax.style.backgroundColor = "#f2f2f2"
    yearmax.style.borderColor = "#ffffff"

})

inputLeftDis.addEventListener('mouseover', () => {
    milesmin.style.backgroundColor = "white"
    milesmin.style.borderColor = "#0266ff"

})
inputLeftDis.addEventListener('mouseout', () => {
    milesmin.style.backgroundColor = "#f2f2f2"
    milesmin.style.borderColor = "#ffffff"

})
inputRightDis.addEventListener('mouseover', () => {
    milesmax.style.backgroundColor = "white"
    milesmax.style.borderColor = "#0266ff"

})
inputRightDis.addEventListener('mouseout', () => {
    milesmax.style.backgroundColor = "#f2f2f2"
    milesmax.style.borderColor = "#ffffff"

})

const setLeftYearValue = () => {
    const diff = inputLeftYear.value - inputRightYear.value
    if (diff > 0) {
        // console.log(diff, 'ex');
        return
    }
    yearmin.innerHTML = inputLeftYear.value
    userData.VEHICLE['Years'] = inputLeftYear.value + ' - ' + inputRightYear.value

}
inputLeftYear.oninput = function() {
    const diff = this.value - inputRightYear.value
    if (diff > 0) {
        // console.log(diff, 'ex');
        return
    }
    yearmin.innerHTML = this.value
    userData.VEHICLE['Years'] = this.value + ' - ' + inputRightYear.value
}
const setRightYearValue = () => {

    const diff = inputRightYear.value - inputLeftYear.value
    if (diff < 0) {
        // console.log(diff, 'ex');
        return
    }
    yearmax.innerHTML = inputRightYear.value
    userData.VEHICLE['Years'] = inputLeftYear.value + ' - ' + inputRightYear.value


}
inputRightYear.oninput = function() {
    const diff = this.value - inputLeftYear.value
    if (diff < 0) {
        // console.log(diff, 'ex');
        return
    }

    yearmax.innerHTML = this.value
    userData.VEHICLE['Years'] = inputLeftYear.value + ' - ' + this.value

}
const setLeftDisValue = () => {
    // const diff = inputLeftDis.value - inputRightDis.value
    // if (diff > 0) {
    //     // console.log(diff, 'ex');
    //     return
    // }

    let v = inputLeftDis.value
    if (v > 200000) {
        v = "200000 +"
    }
    temp = inputRightDis.value
    if (temp > 200000) {
        temp = "200000 +"
    }

    milesmin.innerHTML = numberWithCommas(v)
    userData.VEHICLE['Miles / Odometer'] = numberWithCommas(v) + ' - ' + numberWithCommas(temp)

}
inputLeftDis.oninput = function() {
    const diff = this.value - inputRightDis.value
    if (diff > 0) {
        // console.log(diff, 'ex');
        return
    }
    let v = this.value
    if (v > 200000) {
        v = "200000 +"
    }
    temp = inputRightDis.value
    if (temp > 200000) {
        temp = "200000 +"
    }
    milesmin.innerHTML = numberWithCommas(v)
    userData.VEHICLE['Miles / Odometer'] = numberWithCommas(v) + ' - ' + numberWithCommas(temp)


}
const setRightDisValue = () => {
    const diff = inputRightDis.value - inputLeftDis.value
    if (diff < 0) {
        // console.log(diff, 'ex');
        return
    }
    let v = inputRightDis.value
    if (v > 200000) {
        v = "200000 +"
    }
    milesmax.innerHTML = numberWithCommas(v)
    userData.VEHICLE['Miles / Odometer'] = numberWithCommas(inputLeftDis.value) + ' - ' + numberWithCommas(v)

}
inputRightDis.oninput = function() {
    let v = this.value
    const diff = v - inputLeftDis.value
    if (diff < 0) {
        // console.log(diff, 'ex');
        return
    }
    if (v > 200000) {
        v = "200000 +"
    }
    milesmax.innerHTML = numberWithCommas(v)
    userData.VEHICLE['Miles / Odometer'] = numberWithCommas(inputLeftDis.value) + ' - ' + numberWithCommas(v)

}

function setLeftValue(il, ir, tl, tr, r, typeSlider) {
    const errl = 1.3
    const errr = 1
    const err = 1.2
    var _this = il,
        min = parseInt(_this.min),
        max = parseInt(_this.max);
    console.log(parseInt(_this.value), parseInt(ir.value));
    if (_this.value == max && typeSlider === "year") {
        console.log('heere');

        _this.value = Math.min(parseInt(_this.value), (parseInt(ir.value) - 1));

    }
    _this.value = Math.min(parseInt(_this.value), (parseInt(ir.value)));


    var percent = ((_this.value - min) / (max - min)) * 100;
    if (percent < 1 && (typeSlider === "dis" || typeSlider === "year")) {
        percent = percent + 0
        console.log('done');

    }
    if (percent < 5) {
        percent += 1
    }


    if (percent >= 35) {
        percent = percent - 1
    }
    if (percent >= 50) {
        percent = percent - errr
    }
    if (percent >= 80) {
        percent = percent - 0.7
    }
    if (percent >= 85) {
        percent = percent - 1
    }
    if (percent >= 92) {
        percent = percent - 1.5
    }

    tl.style.left = percent + "%";
    r.style.left = percent + "%";
    // if (parseInt(_this.value) >= parseInt(ir.value)) {
    //     return
    // }
}

function setLeftValueinit(il, ir, tl, tr, r, typeSlider) {
    const errl = 1.3
    const errr = 1
    const err = 1.2
    var _this = il,
        min = parseInt(_this.min),
        max = parseInt(_this.max);
    console.log(parseInt(_this.value), parseInt(ir.value));
    // if (_this.value == max && typeSlider === "year") {
    //     console.log('heere');

    //     _this.value = Math.min(parseInt(_this.value), (parseInt(ir.value) - 1));

    // }
    // _this.value = Math.min(parseInt(_this.value), (parseInt(ir.value)));


    var percent = ((_this.value - min) / (max - min)) * 100;
    if (percent < 1 && (typeSlider === "dis" || typeSlider === "year")) {
        percent = percent + 0
        console.log('done');

    }
    if (percent < 5) {
        percent += 1
    }


    if (percent >= 35) {
        percent = percent - 1
    }
    if (percent >= 50) {
        percent = percent - errr
    }
    if (percent >= 80) {
        percent = percent - 0.7
    }
    if (percent >= 85) {
        percent = percent - 1
    }
    if (percent >= 92) {
        percent = percent - 1.5
    }

    tl.style.left = percent + "%";
    r.style.left = percent + "%";
    // if (parseInt(_this.value) >= parseInt(ir.value)) {
    //     return
    // }
}
setLeftValue(inputLeftYear, inputRightYear, thumbLeftYear, thumbRightYear, rangeYear, 'year');
setLeftValue(inputLeftDis, inputRightDis, thumbLeftDis, thumbRightDis, rangeDis, 'dis');

function setRightValue(il, ir, tl, tr, r, typeSlider) {
    const errl = 0.9
    const errr = 0.85
    const err = 1.2
    var _this = ir,
        min = parseInt(_this.min),
        max = parseInt(_this.max);
    if ((_this.value < max || _this.value == max) && il.value == max - 1) {
        console.log('here');
        yearmax.innerText = max
        _this.value = max

    } else {
        _this.value = Math.max(parseInt(_this.value), parseInt(il.value));
    }

    var percent = ((_this.value - min) / (max - min)) * 100;
    if (percent >= 85) {
        percent = percent - 2
    } else if (percent >= 50) {
        percent = percent - errr
    } else if (percent <= 20) {
        percent = percent + 3
    } else {
        percent = percent + errl
    }
    let rigtmtd = 100 - percent
    if (rigtmtd <= 70 && percent >= 50) {
        // console.log('in');
        rigtmtd = rigtmtd - 1
    }
    if (rigtmtd <= 1 && (typeSlider === "dis")) {
        console.log('in');
        rigtmtd = rigtmtd + 1.5
    }
    tr.style.right = rigtmtd + "%";
    r.style.right = rigtmtd + "%";
}
setRightValue(inputLeftYear, inputRightYear, thumbLeftYear, thumbRightYear, rangeYear, 'year');
setRightValue(inputLeftDis, inputRightDis, thumbLeftDis, thumbRightDis, rangeDis, 'dis');

inputLeftYear.addEventListener("input", () => {
    setLeftValue(inputLeftYear, inputRightYear, thumbLeftYear, thumbRightYear, rangeYear, 'year')
});
inputRightYear.addEventListener("input", () => {
    setRightValue(inputLeftYear, inputRightYear, thumbLeftYear, thumbRightYear, rangeYear, 'year')
});
inputLeftDis.addEventListener("input", () => {
    setLeftValue(inputLeftDis, inputRightDis, thumbLeftDis, thumbRightDis, rangeDis, 'dis')
});
inputRightDis.addEventListener("input", () => {
    setRightValue(inputLeftDis, inputRightDis, thumbLeftDis, thumbRightDis, rangeDis, 'dis')
});



let isopen = false
const displayNav = (para) => {
    if (!isopen) {
        document.getElementById(para).classList.add('displayMenu')
            // document.querySelector('header').style.height = "90%"
        document.getElementById('res-drp-bars').style.display = "none"
        document.getElementById('res-drp-close').style.display = "inline"
        if (para === 'responsive-sidebar') {

            document.querySelector("#blurdiv").style.display = "inline"

        }
        isopen = true
    } else {
        document.getElementById(para).classList.remove('displayMenu')
            // document.querySelector('header').style.height = "70px"
        document.getElementById('res-drp-bars').style.display = "inline"
        document.getElementById('res-drp-close').style.display = "none"
        if (para === 'responsive-sidebar') {

            document.querySelector("#blurdiv").style.display = "none"
        }
        isopen = false
    }
}






let lastactivetab = 'live-listing'
const activeTab = function(val) {
        document.querySelectorAll('.' + lastactivetab + '-active').forEach((e) => { e.style.display = "none" })
        document.querySelectorAll('.' + lastactivetab + '-tab').forEach((e) => { e.style.color = "black" })
        document.querySelectorAll('.' + val + '-active').forEach((e) => { e.style.display = "inline" })
        document.querySelectorAll('.' + val + '-tab').forEach((e) => { e.style.color = "#0266ff" })

        lastactivetab = val
            // console.log('called');

    }
    // activeTab('live-listing')




// event on btn


const initBtnSelection = () => {
    const divbtn = document.querySelectorAll('.btn-div')

    divbtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            const parentDiv = e.target.parentElement
                // console.log(parentDiv.className);
                // const divval = 'headerandbutton-container-button-div'
                // if (parentDiv.className === divval) {
                //     console.log(parentDiv.children[0]);

            // }
            if (parentDiv.className === "btn-div auc-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (parentDiv.children[2].innerText === "Exclude Live Appraisal") {
                    parentDiv.children[1].setAttribute('src', '../assets/cross.svg')
                    if (isclicked === "no") {
                        parentDiv.style.backgroundColor = "#E73E3E"
                        parentDiv.style.color = "white"
                        parentDiv.children[0].style.display = "none"
                        parentDiv.children[1].style.display = "inline"
                        userData.AUCTION['Auction / Inspection Type'].push(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "yes");
                    } else {
                        parentDiv.style.backgroundColor = "#EAEAEA"
                        parentDiv.style.color = "black"
                        parentDiv.children[0].style.display = "inline"
                        parentDiv.children[1].style.display = "none"
                        userData.AUCTION['Auction / Inspection Type'].remove(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "no");
                    }
                } else {
                    if (isclicked === "no") {
                        parentDiv.style.backgroundColor = "#0266ff"
                        parentDiv.style.color = "white"
                        parentDiv.children[0].style.display = "none"
                        parentDiv.children[1].style.display = "inline"
                        userData.AUCTION['Auction / Inspection Type'].push(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "yes");
                    } else {
                        parentDiv.style.backgroundColor = "#EAEAEA"
                        parentDiv.style.color = "black"
                        parentDiv.children[0].style.display = "inline"
                        parentDiv.children[1].style.display = "none"
                        userData.AUCTION['Auction / Inspection Type'].remove(parentDiv.children[2].innerText)
                        parentDiv.setAttribute("data-isclicked", "no")
                    }
                }


            }
            if (parentDiv.className === "btn-div color-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#0266ff"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.AUCTION['Auction Color'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.AUCTION['Auction Color'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no")
                }


            }
            if (parentDiv.className === "btn-div states-exclude-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.AUCTION['States (Exclude)'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.AUCTION['States (Exclude)'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
            if (parentDiv.className === "btn-div body-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#0266ff"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.VEHICLE['Body Type'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.VEHICLE['Body Type'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no")
                }
                validateMakeModelBodyFun()
            }
            if (parentDiv.className === "btn-div drivertrain-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#0266ff"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.VEHICLE['Drivetrain'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.VEHICLE['Drivetrain'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no")
                }

            }
            if (parentDiv.className === "btn-div transmission-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#0266ff"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.VEHICLE['Transmission'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.VEHICLE['Transmission'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no")
                }


            }
            if (parentDiv.className === "btn-div fuel-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#0266ff"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.VEHICLE['Fuel Type'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.VEHICLE['Fuel Type'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no")
                }

            }
            if (parentDiv.className === "btn-div reserve-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#0266ff"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.VEHICLE['Reserve Met'] = (parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                    const x = parentDiv.getAttribute("data-other")
                    const other = parentDiv.parentNode.children[x]
                    other.style.backgroundColor = "#EAEAEA"
                    other.style.color = "black"
                    other.children[0].style.display = "inline"
                    other.children[1].style.display = "none"
                    other.setAttribute("data-isclicked", "no")
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.VEHICLE['Reserve Met'] = ''
                    parentDiv.setAttribute("data-isclicked", "no")
                    const x = parentDiv.getAttribute("data-other")
                    const other = parentDiv.parentNode.children[x]
                    other.style.backgroundColor = "#EAEAEA"
                    other.style.color = "black"
                    other.children[0].style.display = "inline"
                    other.children[1].style.display = "none"
                    other.setAttribute("data-isclicked", "no")
                }
            }
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
                validateMakeModelBodyFun()

            }
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
                // validateMakeModelBodyFun()

            }
            if (parentDiv.className === "btn-div announcement-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['ACV Carfax Announcements'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['ACV Carfax Announcements'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }


            }

            if (parentDiv.className === "btn-div driveability-issues-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['Driveability Issues'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['Driveability Issues'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }


            }
            if (parentDiv.className === "btn-div exdamage-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['Exterior Damage'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['Exterior Damage'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
            if (parentDiv.className === "btn-div indamage-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['Interior Damage'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['Interior Damage'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }


            }
            if (parentDiv.className === "btn-div framesandunibodyissues-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['Frame & Unibody Issues'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['Frame & Unibody Issues'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
            if (parentDiv.className === "btn-div mechissues-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['Mechanical Issues'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['Mechanical Issues'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
            if (parentDiv.className === "btn-div lightissues-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['Warning Lights Issues'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['Warning Lights Issues'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
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

            if (parentDiv.className === "btn-div sellernotes-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['Seller Notes'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['Seller Notes'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
            if (parentDiv.className === "btn-div tittleissues-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['Title Issues'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['Title Issues'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
            if (parentDiv.className === "btn-div wheelandtiresissues-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['Wheels & Tires Issues'].push(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['Wheels & Tires Issues'].remove(parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
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

            if (parentDiv.className === "btn-div notification-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                    // const isdisabled = parentDiv.getAttribute('disabled')
                    //     // console.log(isdisabled);
                    // if (isdisabled === "true") {
                    //     console.log('disabled');

                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#0266ff"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.NOTIFICATION.istrue = (parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "yes");
                    const x = parentDiv.getAttribute("data-other")
                    const other = parentDiv.parentNode.children[x]
                    other.style.backgroundColor = "#EAEAEA"
                    other.style.color = "black"
                    other.children[0].style.display = "inline"
                    other.children[1].style.display = "none"
                    parentDiv.setAttribute("data-isclicked", "no")

                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.NOTIFICATION.istrue = (parentDiv.children[2].innerText)
                    parentDiv.setAttribute("data-isclicked", "no")
                    const x = parentDiv.getAttribute("data-other")
                    const other = parentDiv.parentNode.children[x]
                    other.style.backgroundColor = "#EAEAEA"
                    other.style.color = "black"
                    other.children[0].style.display = "inline"
                    other.children[1].style.display = "none"
                    parentDiv.setAttribute("data-isclicked", "no")


                }

            }



        })
    })
}

// initBtnSelection()

const showHome = (val) => {
    window.location.href = val
}

const pages = ['#page1', '#page2', '#page3', '#review-page']

const changePage = (val) => {
        pages.forEach((pg) => {
            document.querySelector(pg).style.display = "none"
        })
        document.querySelector(val).style.display = "inline"
        document.querySelector(val).scrollBy(0, -10000)
            // document.getElementById('confirm-btn').setAttribute('disabled', 'disabled')

    }
    // changePage('#page2')


Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};



const datadisplaysection = document.querySelector('#data-display-section') //need to push div here

// rendering the review---------------------------

const reviewData = () => {
    let isSmsReq = false
    datadisplaysection.innerHTML = ""
    const dataKeys = Object.keys(userData)
    dataKeys.forEach((key) => {
        // console.log(key);//this will be the heading of div
        const k = userData[key]
        const caption = Object.keys(k)
        const content = Object.values(k)
        let index = 0
        let renderedcaptionleft = ""
        let renderedcaptionright = ""
        const length = caption.length
        let counter = -1
        caption.forEach((captionVal) => {
                counter = counter + 1
                    // console.log(captionVal); //caption val 
                let contentStrForCaption = "" //content of that caption
                const contentArr = content[index]
                let contentStr = ""
                if (contentArr === null || (typeof contentArr) === "string") {
                    contentStrForCaption = contentArr; //contenttorender
                    index = index + 1

                } else {
                    contentArr.forEach((x) => {
                        contentStr = contentStr + x + ', '
                    })
                    index = index + 1
                    contentStrForCaption = (contentStr.slice(0, -2)); //content of that caption
                }
                if (captionVal === "istrue") {
                    // if (userData.NOTIFICATION.istrue === "No") {
                    //     document.getElementById('estimation-div-right-review').innerHTML = "N/A"

                    // }
                    if (userData.NOTIFICATION.istrue === "Yes") {
                        document.getElementById('estimation-div-right-review').innerHTML = '<div class="loader-small"></div>'
                        document.getElementById('senstivityLevel').style.color = '#E73E3E'
                        document.getElementById('confirm-btn').setAttribute('disabled', 'disabled')
                        document.getElementById('confirm-btn').style.background = '#BDC1C8';
                        isSmsReq = true
                    }else{
                        document.getElementById('estimation-div-right-review').innerHTML = 'N/A'
                        document.getElementById('senstivityLevel').style.color = '#E73E3E'
                        document.getElementById('confirm-btn').style.background = '#0044aa';
                        document.getElementById('confirm-btn').removeAttribute('disabled')
                    }
                    renderedcaptionleft = renderedcaptionleft + captiondivCreator(captionVal, contentStrForCaption);

                } else if (counter < (length / 2)) {
                    renderedcaptionleft = renderedcaptionleft + captiondivCreator(captionVal, contentStrForCaption);
                } else {
                    renderedcaptionright = renderedcaptionright + captiondivCreator(captionVal, contentStrForCaption)
                }
            })
            // console.log(renderedcaption);
        const divtopushtosection = fulldivCreator(key, renderedcaptionleft, renderedcaptionright)
            // console.log(divtopushtosection);
        datadisplaysection.insertAdjacentHTML('beforeend', divtopushtosection)

    })
    saveFilter(isSmsReq)
    return true

}



// for rendering templates

const captionrowtemplate = document.querySelector('#caption-value-div').innerHTML
const reviewdatatemplate = document.querySelector('#review-data-template').innerHTML

// const datadisplaysection = document.querySelector('#data-display-section') //need to push div here

const captiondivCreator = (cap, val) => {
    let pdtop = "4px"
    if (cap === "istrue") {
        cap = "Receive SMS Notification"
    }
    if (cap === "INCLUDE") {
        pdtop = "13px"
    }
    const captiondivtopush = Mustache.render(captionrowtemplate, {
        caption: cap + ": ",
        value: val,
        pdtop: pdtop
    })
    return captiondivtopush
}
const fulldivCreator = (head, dataleftdiv, datarightdiv) => {
    let subhead = "none"
    let classNamePush = "line"
    let pagenum = "\'#page"
    if (head === "AUCTION") {
        pagenum = pagenum + '1\''
    } else if (head === "VEHICLE") {
        pagenum = pagenum + '2\''
    } else if (head === "CONDITION") {
        pagenum = pagenum + '3\''
        subhead = "inline"
    } else {
        pagenum = pagenum + '3\''

    }
    if (head === 'NOTIFICATION') {
        head = "TEXT / SMS NOTIFICATION"
        classNamePush = "no-line"
    }

    const divtopush = Mustache.render(reviewdatatemplate, {
        divheading: head,
        divsubhead: subhead,
        leftdivdata: dataleftdiv,
        pushLine: classNamePush,
        rightdivdata: datarightdiv,
        pagenum: pagenum
    })
    return divtopush
}


///for modal poopup


const modaltemplate = document.querySelector('#modal-template').innerHTML
const modalcontainer = document.querySelector('#modal-container')
const modal = document.querySelector('#modal-popup')
const cancelFilter = (hrefTo) => {
    // removeprevlistener(modal)
    const head = "Sure you want to cancel?"
    const foot = "All data will be lost."
    const classleft = 'yes-cancel'
    const classright = 'back-btn'
    const rightbtndata = "BACK"
    const leftbtndata = '<span>YES, CANCEL</span>'
    const rightbtnaction = 'closeModal()'
    const leftbtnaction = 'showHome(' + "\'" + hrefTo + "\'" + ')'
    const push = Mustache.render(modaltemplate, {
        headdata: head,
        footdata: foot,
        classleftbtn: classleft,
        classrightbtn: classright,
        btnleftdata: leftbtndata,
        btnrightdata: rightbtndata,
        leftbtn: leftbtnaction,
        rightbtn: rightbtnaction
    })
    modalcontainer.innerHTML = push
    openModal()
    return "leave"

}

const showReviewBtn = () => {
    const btns = document.querySelectorAll('.backtoreview')
    btns.forEach((ele) => {
        ele.style.display = "inline"
    })
    const nbtn = document.querySelectorAll('.next-btn')
    nbtn.forEach((ele) => {
        ele.style.display = "none"
    })

}

const confirm = () => {
    if(smsSensitivity!=undefined && smsSensitivity!=null && smsSensitivity=="TOO HIGH!") {
        const head = "<span style='color:red;'>Warning!</span>"
        const foot = "You'll receive <span style='font-size:14px; font-weight:bold;' >" + smsCount + "</span> texts per day for this filter. We recommend making your filters stricter."
        const classleft = 'go-back-btn'
        const classright = 'next-page-btn'
        const rightbtndata = "IT'S OKAY"
        const leftbtndata = '<img  style="margin-right: 5px;" src="../assets/back-arrow-red.svg"><span>GO BACK</span>'
        const rightbtnaction = 'createReqSaveFilter()'
        const leftbtnaction = 'closeModal()'
        const push = Mustache.render(modaltemplate, {
            headdata: head,
            footdata: foot,
            classleftbtn: classleft,
            classrightbtn: classright,
            btnleftdata: leftbtndata,
            btnrightdata: rightbtndata,
            leftbtn: leftbtnaction,
            rightbtn: rightbtnaction
        })
        modalcontainer.innerHTML = push
        openModal()
    }else{
        createReqSaveFilter()
    }

}
const noNotification = () => {
    document.getElementById('no-notification').click()
    closeModal()

}
const modalVerifyNumber = () => {
    const head = "<span style='color:black;'>Wait!</span>"
    const foot = "Please enter a valid mobile number in your Account page."
    const classright = 'next-page-btn'
    const rightbtndata = "OKAY"
    const rightbtnaction = 'noNotification()'
    const push = Mustache.render(modaltemplate, {
        headdata: head,
        footdata: foot,
        classrightbtn: classright,
        oneBtn: "none",
        btnrightdata: rightbtndata,
        rightbtn: rightbtnaction
    })
    modalcontainer.innerHTML = push
    openModal()

}

const openModal = () => {
    modalcontainer.children[0].style.display = "block"
}
const closeModal = () => {
    modalcontainer.children[0].style.display = "none"
}
const tooltips = document.querySelectorAll('.tooltiptext')

const closeToolTip = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        tooltips.forEach((ele) => {
            const isopen = ele.getAttribute('data-clicked')
            console.log(isopen);
            if (isopen === "yes") {
                ele.style.display = "none"
                ele.setAttribute('data-clicked', 'no')

            }

        })
    }

}
const shouldShiftToolTip = (tooltip, height) => {
    flag = false
    document.querySelectorAll('.section-wrapper').forEach((ele) => {
        let top = getOffsetTop(tooltip)
        let scroll = ele.scrollTop
        scroll += 100
        scroll += height
        if (scroll >= top && top != 0) {
            flag = true
        }

    })
    return flag

}

const tooltip = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelectorAll('.tooltipimg').forEach((ele) => {

            ele.addEventListener('click', (e) => {

                const isopen = e.target.parentNode.children[2].getAttribute('data-clicked')
                    // console.log(isopen);
                if (isopen === "no") {
                    e.target.parentNode.children[2].style.display = "inline";
                    const offset = e.target.parentNode.children[0].offsetWidth
                    const height = e.target.parentNode.children[2].offsetHeight
                    const flag = shouldShiftToolTip(e.target.parentNode.children[2], height)
                    console.log(flag);
                    if (flag) {
                        e.target.parentNode.children[2].style.top = '25px'

                    } else {
                        e.target.parentNode.children[2].style.top = -height + 'px'

                    }
                    e.target.parentNode.children[2].style.left = offset / 3 + 'px'
                    setTimeout(() => {
                        e.target.parentNode.children[2].setAttribute('data-clicked', 'yes')

                    }, 50)

                } else {
                    e.target.parentNode.children[2].style.display = "none"
                    e.target.parentNode.children[2].setAttribute('data-clicked', 'no')
                }
            })


        })
    } else {
        document.querySelectorAll('.tooltipimg').forEach((ele) => {
            ele.addEventListener('mouseover', (e) => {
                e.target.parentNode.children[2].style.display = "inline";
                const offset = e.target.parentNode.children[0].offsetWidth
                const height = e.target.parentNode.children[2].offsetHeight
                const flag = shouldShiftToolTip(e.target.parentNode.children[2], height)
                console.log(flag);
                if (flag) {
                    e.target.parentNode.children[2].style.top = '25px'

                } else {
                    e.target.parentNode.children[2].style.top = -height + 'px'

                }
                e.target.parentNode.children[2].style.left = offset / 3 + 'px'

            })

            ele.addEventListener('mouseout', (e) => {
                e.target.parentNode.children[2].style.display = "none";

            })
        })
    }
}
tooltip()
const logout = document.querySelectorAll('.logouthover')
const logoutwhite = document.querySelectorAll('.logout-white')
const logoutred = document.querySelectorAll('.logout-red')

logout.forEach((ele) => {
    ele.addEventListener('mouseover', () => {
        logoutred.forEach((e) => {
            e.style.display = "none"
        })

        logoutwhite.forEach((e) => {
            e.style.display = "inline"
        })


    })
    ele.addEventListener('mouseout', () => {
        logoutred.forEach((e) => {
            e.style.display = "inline"
        })

        logoutwhite.forEach((e) => {
            e.style.display = "none"
        })
    })
})
const showFilterCard = () => {
    listcontainer.style.display = "none"
    filtercontainer.style.display = "block"
}
const showListCard = () => {
    filtercontainer.style.display = "none"
    listcontainer.style.display = "block"
}

const bdy = document.getElementById('wrap-bdy')
    // var state = 1
window.onresize = () => {
    const width = bdy.offsetWidth
        // console.log(width);

    if (width > 460) {
        document.getElementById('blurdiv').style.display = "none"
            // state = state + 1
    }

}



var ischeckedbox = false
const ischecked = () => {
    const ele = document.querySelector('.remember-me-checkbox')
    const i = document.querySelector('.checkboximg')
    ele.addEventListener('click', () => {
        if (!ischeckedbox) {
            ele.style.backgroundColor = "#0f6eff"
            i.style.display = "inline"
            ischeckedbox = true
        } else {
            ele.style.backgroundColor = "rgba(220, 220, 220, 0.8)"
            i.style.display = "none"
            ischeckedbox = false
        }
    })

}
ischecked()



const body = document.querySelector('.body-wrapper')
const buttons = document.querySelectorAll('button')
    // console.log(buttons);
buttons.forEach((button) => {
    button.addEventListener('mouseover', () => {
        if (body.offsetWidth > 550) {
            button.style.opacity = "0.75"
        }
    })
    button.addEventListener('mouseout', () => {
        if (body.offsetWidth > 550) {
            button.style.opacity = "1"
        }
    })
});
// const bodytooltip = document.getElementById('wrap-bdy')
// const tooltips = document.querySelectorAll('.tooltiptext')

// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//     bodytooltip.addEventListener('click', () => {
//         tooltips.forEach((e) => {
//             if (e.style.display === "inline") {
//                 e.style.display = "none"
//             }
//         })
//     })

// }


//back change to black due to
let isNormalMenuOpen = false
const displayMenu = () => {
    const menu = document.getElementById('normal-dropdown')
    const normalMenu = document.getElementById('normal-sidebar')
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        menu.addEventListener('click', () => {
            if (!isNormalMenuOpen) {
                normalMenu.style.display = "flex"
                isNormalMenuOpen = true
            } else {
                normalMenu.style.display = "none"
                isNormalMenuOpen = false
            }
        })
    } else {
        menu.addEventListener('mouseover', () => {
            normalMenu.style.display = "flex"
        })
        menu.addEventListener('mouseout', () => {
            normalMenu.style.display = "none"
        })
    }
}
displayMenu()
const closeMenu = () => {

    document.getElementById('normal-sidebar').style.display = "none"
    isNormalMenuOpen = false
}
const checkFilterName = () => {
    const val = document.getElementById('filter-name').value
    if (!val || val === "") {
        changePage('#page1')
        document.getElementById('filter-name').focus()
        document.getElementById('filter-name').style.border = "1px solid red"

    } else {
        document.getElementById('filter-name').style.border = "1px solid white"

    }
}
const encoderForDiv = (val) => {
    var encodedStr = val

    var parser = new DOMParser;
    var dom = parser.parseFromString(
        '<!doctype html><body>' + encodedStr,
        'text/html');
    var decodedString = dom.body.textContent;

    return decodedString
}





// dymanic tooltip

const getOffsetTop = (elem) => {
    var offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while (elem = elem.offsetParent);
    return offsetTop;
}

const dynamictooltip = () => {
    const headMargin = 70
    document.querySelectorAll('.section-wrapper').forEach((ele) => {
        ele.onscroll = () => {
            const tooltips = document.querySelectorAll('.tooltiptext')
            tooltips.forEach((tooltip) => {
                let top = getOffsetTop(tooltip)
                let scroll = ele.scrollTop
                scroll += headMargin
                if (scroll >= top && top != 0) {
                    console.log('change');
                    tooltip.style.top = "25px"
                }
            })
        }
    })
}
dynamictooltip()