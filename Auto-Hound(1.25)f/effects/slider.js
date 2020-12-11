const initSlidersCustom = () => {
    let yrRightThumb
    let disRightThumb
    let yrLeftThumb
    let disLeftThumb
    let valyearMax
    let valyearMin
    let valDisMax
    let valDisMin
    document.querySelectorAll('.to').forEach((ele) => {
        if (!yrRightThumb) {
            yrRightThumb = ele.children[0]
        } else {
            disRightThumb = ele.children[0]
        }
    })
    document.querySelectorAll('.from').forEach((ele) => {
        if (!yrLeftThumb) {
            yrLeftThumb = ele.children[0]
        } else {
            disLeftThumb = ele.children[0]
        }
    })

    // document.querySelectorAll('.irs-to').forEach((ele) => {
    //     ele.style.display = "none"
    // })
    // document.querySelectorAll('.irs-from').forEach((ele) => {
    //     ele.style.display = "none"

    // })




    yrRightThumb.addEventListener('mouseover', (e) => {
        yearmax.style.backgroundColor = "white"
        yearmax.style.borderColor = "#0266ff"
    })
    yrRightThumb.addEventListener('mouseout', (e) => {
        yearmax.style.backgroundColor = "#f2f2f2"
        yearmax.style.borderColor = "white"
    })

    yrLeftThumb.addEventListener('mouseover', (e) => {
        yearmin.style.backgroundColor = "white"
        yearmin.style.borderColor = "#0266ff"
    })
    yrLeftThumb.addEventListener('mouseout', (e) => {
        yearmin.style.backgroundColor = "#f2f2f2"
        yearmin.style.borderColor = "white"
    })



    disRightThumb.addEventListener('mouseover', (e) => {
        milesmax.style.backgroundColor = "white"
        milesmax.style.borderColor = "#0266ff"
    })
    disRightThumb.addEventListener('mouseout', (e) => {
        milesmax.style.backgroundColor = "#f2f2f2"
        milesmax.style.borderColor = "white"
    })
    disLeftThumb.addEventListener('mouseover', (e) => {
        milesmin.style.backgroundColor = "white"
        milesmin.style.borderColor = "#0266ff"
    })
    disLeftThumb.addEventListener('mouseout', (e) => {
        milesmin.style.backgroundColor = "#f2f2f2"
        milesmin.style.borderColor = "white"
    })








    yrRightThumb.addEventListener('touchstart', (e) => {
        yearmax.style.backgroundColor = "white"
        yearmax.style.borderColor = "#0266ff"
    })
    yrRightThumb.addEventListener('touchend', (e) => {
        yearmax.style.backgroundColor = "#f2f2f2"
        yearmax.style.borderColor = "white"
    })

    yrLeftThumb.addEventListener('touchstart', (e) => {
        yearmin.style.backgroundColor = "white"
        yearmin.style.borderColor = "#0266ff"
    })
    yrLeftThumb.addEventListener('touchend', (e) => {
        yearmin.style.backgroundColor = "#f2f2f2"
        yearmin.style.borderColor = "white"
    })



    disRightThumb.addEventListener('touchstart', (e) => {
        milesmax.style.backgroundColor = "white"
        milesmax.style.borderColor = "#0266ff"
    })
    disRightThumb.addEventListener('touchend', (e) => {
        milesmax.style.backgroundColor = "#f2f2f2"
        milesmax.style.borderColor = "white"
    })
    disLeftThumb.addEventListener('touchstart', (e) => {
        milesmin.style.backgroundColor = "white"
        milesmin.style.borderColor = "#0266ff"
    })
    disLeftThumb.addEventListener('touchend', (e) => {
        milesmin.style.backgroundColor = "#f2f2f2"
        milesmin.style.borderColor = "white"
    })

}
initSlidersCustom()
const adjustValueDb = (data) => {
    const id = data.input[0].id
    if (id == "year-slider-db") {
        yearmax.innerText = data.to
        yearmin.innerText = data.from
        userData.VEHICLE['Years'] = document.getElementById(id).value

    }
    if (id == "miles-slider-db") {
        let toData = data.to_pretty
        let fromData = data.from_pretty
            // console.log(data.to, data.from);

        if (data.to == "205000") {
            toData = "200,000+"
        }
        if (data.from == "205000") {
            fromData = "200,000+"
        }
        milesmax.innerText = toData
        milesmin.innerText = fromData
        let toState = fromData + " - " + toData
        userData.VEHICLE['Miles / Odometer'] = toState
    }


}
//changePage('#page2')
