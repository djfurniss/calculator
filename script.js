// CONTROLLING TOGGABLE VARIABLES
let result = 0;
let num1 = null;
let num2 = null;
let opActive = false;
let operation = null;
let submitted = false;
let decAvail = true;

// ELEMENTS DECLARATIONS AND QUERIES
const activeNums = document.getElementById('active-nums');
const numButtons = document.querySelectorAll(".button.num");
const opButtons = document.querySelectorAll(".button.op");
const dec = document.querySelector('.button.dec');
const submit = document.getElementById('submit');
const buttonsCont = document.querySelector('.buttons-cont')
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');

// ! if activeNums.innerText, render the clear and backspace button

// NUMBERS BUTTONS LISTENERS
numButtons.forEach(button=>{
    // console.log("number button", button.innerText)
    button.addEventListener("click", (e) => {
        if (opActive){
            opActive = false;
            activeNums.innerText = ""
        }

        if (submitted){
            activeNums.innerText = e.target.innerText;
            submitted = false;
            submit.style.backgroundColor = '#4a4a4a';
            backspace.style.opacity = "1";
            num1 = null;
        }else{
            activeNums.innerText += e.target.innerText
        }

        buttonsCont.style.opacity = '1';
    })

    button.addEventListener("mousedown", (e) => {
        e.target.style.backgroundColor = '#f5f5f5'
        e.target.style.color = '#141414';
    })
    
    button.addEventListener("mouseup", (e) => {
        e.target.style.backgroundColor = '#4a4a4a';
        e.target.style.color = '#f5f5f5';
    })
})

// OPERATOR BUTTONS LISTENERS
opButtons.forEach(button => {
    // console.log("operator", button.innerText);
    button.addEventListener("click", (e) => {
        opActive = true;
        operation = button.innerText
        // reset the decimal usage
        decReset();
        // button.style.color = opActive ? 'white' : 'black'

        // * if num1 is already established, it's time to set num 2 and proceed with the operation
        if (!num1) {
            num1 = Number(activeNums.innerText);
            console.log("first num: ", num1);
        }else {
            console.log("second num: ", num2)
            if (submitted){
                num2 = null;
                submitted = false;
                submit.style.backgroundColor = '#4a4a4a'
            }else {
                num2 = Number(activeNums.innerText);
                console.log(num1, operation, num2)
                
                if (operation === '/') num1 = num1 / num2
                if (operation === '*') num1 *= num2
                if (operation === '-') num1 -= num2
                if (operation === '+') num1 += num2
                
                activeNums.innerText = num1.toString()
            }
        }
    })

    button.addEventListener("mousedown", (e) => {
        e.target.style.backgroundColor = '#FC9758'
    })

    button.addEventListener("mouseup", (e) => {
        e.target.style.backgroundColor = '#4a4a4a'
    })
})

// DECEMAL LISTENER
dec.addEventListener("click", (e) => {
    if (decAvail){ // if the decimal is available to use, add it to the activeNums strip
        activeNums.innerText += e.target.innerText;
    }
    // deactivate the decimal once it's been used, it will be reactivated in listeners for other buttons
    decAvail = false;
    e.target.style.backgroundColor = '#4a4a4a50';
    e.target.style.color = '#f5f5f550';
    e.target.style.cursor = "not-allowed";
})

// DECIMAL RESET 
const decReset = () => {
    // reset the decimal
    decAvail = true;
    dec.style.backgroundColor = '#4a4a4a';
    dec.style.color = '#f5f5f5';
}

// EQUAL BUTTON LISTENER
submit.addEventListener("click", (e) => {
    submitted = true;
    num2 = Number(activeNums.innerText);
    // console.log("second num", num2);

    if (operation === '/') num1 = num1 / num2
    if (operation === '*') num1 *= num2
    if (operation === '-') num1 -= num2
    if (operation === '+') num1 += num2
    
    activeNums.innerText = num1.toString();
    // reset the decimal usage
    decReset();
    backspace.style.opacity = '.2'
    // * if another number is pressed, restart the process...
    // * if another op is pressed, continue to operate...
})

submit.addEventListener("mousedown", (e) => {
    e.target.style.backgroundColor = '#FC9758'
})

// BACKSPACE LISTENER
backspace.addEventListener("click", () => {
    if (!submitted){
        activeNums.innerText = activeNums.innerText.slice(0, activeNums.innerText.length -1)
        if (!activeNums.innerText){
            buttonsCont.style.opacity = ".2";
        }
    }
})

// CLEAR BUTTON LISTENER 
clear.addEventListener("click", () => {
    activeNums.innerText = "";
    buttonsCont.style.opacity = ".2";
    backspace.style.opacity = "1"
    submit.style.backgroundColor = '#4a4a4a';
    num1 = null;
})