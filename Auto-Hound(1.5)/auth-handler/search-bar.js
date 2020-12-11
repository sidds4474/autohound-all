const c = btnDivContentCreatorCross('obdiiissues-type-btn', arr)
    //document.getElementById('obdiiOptions').innerHTML = c
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