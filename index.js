const colorPicker = document.getElementById("color-picker")
const colorChoicesForm = document.getElementById("color-choices-form")
const modeSelectBox = document.getElementById("mode-select-box")
const tooltip = document.getElementById("tooltip")

colorPicker.value = "#ff0000"

colorChoicesForm.addEventListener("submit", function(e){
    e.preventDefault()
    let colorChoice = colorPicker.value
    colorChoice = colorChoice.substring(1)
    let modeChoice = modeSelectBox.value
    getColors(colorChoice, modeChoice)
})

document.addEventListener("mouseover", function(e){
    if(e.target.classList.contains("hex-value")){
        tooltip.style.opacity = 1
    }
})

document.addEventListener("mouseout", function(e){
    if(e.target.classList.contains("hex-value")){
        tooltip.style.opacity = 0
        tooltip.textContent = "click text to copy"
    }
})

document.addEventListener("click", function(e){
        if(e.target.classList.contains("hex-value")){
        navigator.clipboard.writeText(e.target.textContent)
        tooltip.textContent = "copied to clipboard"
        setTimeout(() => {
            tooltip.style.opacity = 0
        }, 500)
        
    }
})

function getColors(color, mode){
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
        .then(res => res.json())
        .then(data => {
            getColorsHtml(data.colors)
        })
} 

function getColorsHtml(colorsArray){
    let colorsHtml = ""
    colorsArray.forEach(colorObject => { 
        // the following code generates a brightness value (yiq) for each colour in the scheme ref: https://hackmd.io/@Markdown-It/HJeV6339X
        const hexValue = colorObject.hex.clean
        const r = parseInt(hexValue.substr(0,2),16)
        const g = parseInt(hexValue.substr(2,2),16)
        const b = parseInt(hexValue.substr(4,2),16)
        const yiq = ((r*299)+(g*587)+(b*114))/1000
        colorsHtml += `
            <div class="color-container">
                <div class="color-block" style="background-color: ${colorObject.hex.value};"></div>
                <h3 class="hex-value ${yiq >= 128 ? 'dark-text' : 'light-text'}">${colorObject.hex.value}</h3>
            </div>`
    })
    document.getElementById("scheme-container").innerHTML = colorsHtml
}

getColors("ff0000", "monochrome")










