const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelectorAll('input[type="number"]')
const btn = document.querySelectorAll(".button");

document.documentElement.style.setProperty('--color', "orange")

let isGeneratorActive = false
let ClickCopyText = false

/// functions 


function handleInputChange(e) {
  let target = e.target ;
  if (e.target.id === 'rangenumber') {
    target = document.getElementById('range')
  }else if (e.target.id === 'lengthnumber'){
    target = document.getElementById('length')
  }
  const min = target.min
  const max = target.max
  const val = target.value
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

function handleCopyText(){
// Get the text
  let copyText = document.getElementById("result").textContent;
 if (isGeneratorActive ) {
    // Copy the text inside the text
    navigator.clipboard.writeText(copyText);
    document.getElementById("copied").innerHTML = "<p class='green'>copied to clipboard</p>"
    setTimeout(removeText, 1000);
 } else {
    document.getElementById("copied").innerHTML = "<p class='red'>Generate password first</p>"
    setTimeout(removeText, 1000);
 }
  function removeText(){
    document.getElementById("copied").innerHTML = ""
  }
}

function handleStrength(){
    const strength = document.getElementById("range").value;

    // input fields
    let lengthh = document.getElementById("lengthnumber");
    let allowedSymbols = document.getElementById("symbol");
    let useNumbers = document.getElementById("numeric");
    let useCapital = document.getElementById("capital");
    let strengthField = document.getElementById("strengthFieldId");

    if (strength < 30) {
        lengthh.value = 15
        allowedSymbols.value = ""
        useNumbers.checked = false
        useCapital.checked = false
        strengthField.setAttribute("data-tool-tip", "weak") 
        document.documentElement.style.setProperty('--color', "red")
    } else if (strength < 70) {
        lengthh.value = 15
        allowedSymbols.value = "%^*()(^$##>?)"
        useNumbers.checked = true
        useCapital.checked = false
        strengthField.setAttribute("data-tool-tip", "moderate") 
        document.documentElement.style.setProperty('--color', "orange")
    }else if (strength >= 70){
        lengthh.value = 15
        allowedSymbols.value = "_)(*&^%+@#!}!~`|=-?>,<,.]{;=:@@!#$@*&^][]^"
        useNumbers.checked = true
        useCapital.checked = true
        strengthField.setAttribute("data-tool-tip", "strong") 
        document.documentElement.style.setProperty('--color', "green")
    }
}

function handlesubmit(){
    isGeneratorActive = true
    // input field value
    const lengthh = document.getElementById("lengthnumber").value;
    const allowedSymbols = document.getElementById("symbol").value;
    const useNumbers = document.getElementById("numeric").checked
    const useCapital = document.getElementById("capital").checked

    const passwordGenerator = generatePassword(lengthh, allowedSymbols, useNumbers, useCapital);
    document.getElementById("result").textContent = passwordGenerator;    

    function generatePassword(lengthh, allowedSymbols, useNumbers, useCapital) {
        let result  = '';
        let characters = 'abcdefghijklmnopqrstuvwxyz' + allowedSymbols;
        if (useNumbers) {
            characters += "0123456789";
        }
        if (useCapital) {
           characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ" 
        }
        const charactersLength = characters.length;
        for ( let i = 0; i < lengthh; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result
    }
    event.preventDefault();
}

// for each
rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

numberInput.forEach(input => {
    input.addEventListener('input', handleInputChange)
})

btn.forEach(input => {
    input.addEventListener('click', handlesubmit)
  })