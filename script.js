// ELEMENTS QUERIES AND DECLARATIONS
const activeNums = document.getElementById('active-nums'); // the strip of active numbers being operated on
const numButtons = document.querySelectorAll(".button.num"); // buttons that have number class
const opButtons = document.querySelectorAll(".button.op"); // buttons that are operators
const dec = document.querySelector('.button.dec');
const submit = document.getElementById('submit'); // =
const buttonsCont = document.querySelector('.buttons-cont') // the container for backspace and clear
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');

// CONTROLLING TOGGABLE VARIABLES
let num1 = null; // also acts as the total of an equation
let num2 = null;
let opActive = false;
let operation = null;
let submitted = false;
let decAvail = true;

// NUMBERS BUTTONS LISTENERS
    // adding listeners to each number button
numButtons.forEach(button=>{
    button.addEventListener("click", (e) => {
        // when a num has been typed and an operation is chosen for the next number...
        if (opActive){ 
            opActive = false;
            // empty the active nums strip to place the second number
            activeNums.innerText = ""
        };

         // if a full equation has been made already, clicking a number starts a new equation
        if (submitted){
            // reset the state of a fully equated equation since a new one is being started
            submitted = false;
            // null out the result of the last equation that's held in num1
            num1 = null;
            // add the first digit of what will be the new num1 to active nums strip to start; this code wont run after more digits are added
            activeNums.innerText = e.target.innerText; 
            // reset the color of the = button to it's default value
            submit.style.backgroundColor = '#4a4a4a';
            // a submtited equation changes backspace's opacity, since a new equation is starting, reset it's opacity to its deafult
            backspace.style.opacity = "1";
        }else{ // --- if an equation has NOT been fully equated
            activeNums.innerText += e.target.innerText
        };

        // when numbers are typed, the container holding the backspace and clear will appear enabled by having full opacity;
        buttonsCont.style.opacity = '1';
    })

    // styling for when the buttons are actively pressed
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
    button.addEventListener("click", (e) => {
        // an operation has been selected...
        opActive = true;
        // reset the decimal usage
        decReset();
        
        if (!num1) { // if no number is held in num1...
            num1 = Number(activeNums.innerText);
            // set operation to the selected operator
            operation = button.innerText
        }else if (num1 && !num2){
            // the user has their num1, AND TYPED in num2, being here means they didn't press the equal button to finish the equation, instead they want to continue trailing the equation
            num2 = Number(activeNums.innerText);
            
            // complete the set operation between num1 and num2 and set that to num1 which represent the grand total
            if (operation === '/') num1 = num1 / num2
            if (operation === '*') num1 *= num2
            if (operation === '-') num1 -= num2
            if (operation === '+') num1 += num2
            
            // the operation that has now been selected to trail on more than two number is set now, once num1 and num2 have already been calculated
            operation = button.innerText
            // null out num2 so this code can run again and the equation continues trailing, setting num2 to what's in the activeNum strip and calculating based on the operation
            num2 = null;
        };

        // in submission, the result is held in num1 in case further calculation is needed after a full equation process
        if (submitted){
            submitted = false; // ...since continuing the equation
            // null out num2 since it will by typed in now that the operator is selected
            num2 = null;
            operation = button.innerText
            // return = button to original color
            submit.style.backgroundColor = '#4a4a4a'
        };

        // set the text in the activeNums strip to the new total
        activeNums.innerText = num1.toString()
    })

    // styling for when the buttons are actively pressed
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
    // styling for disabled decimal button
    e.target.style.backgroundColor = '#4a4a4a50';
    e.target.style.color = '#f5f5f550';
    e.target.style.cursor = "not-allowed";
})

// DECIMAL RESET -- helper funtion
const decReset = () => {
    // reset the decimal styling to normal
    decAvail = true;
    dec.style.backgroundColor = '#4a4a4a';
    dec.style.color = '#f5f5f5';
}

// EQUAL BUTTON LISTENER
submit.addEventListener("click", (e) => {
    submitted = true;
    // num2 is the most recent number typed in at time of completing equation
    if (!opActive) num2 = Number(activeNums.innerText);

    // do the selected operation between the two numbers
    if (operation === '/') num1 = num1 / num2
    if (operation === '*') num1 *= num2
    if (operation === '-') num1 -= num2
    if (operation === '+') num1 += num2
    
    // set the text in the activeNums strip to the new total
    activeNums.innerText = num1.toString();
    // reset the decimal usage
    decReset();
    // set backspace to a lower capacity so user is not able to backspace total; clear is still available
    backspace.style.opacity = '.2'
})

// = button stays orange when equation is complete until continued or a new one is started
submit.addEventListener("mousedown", (e) => {
    e.target.style.backgroundColor = '#FC9758'
})

// BACKSPACE LISTENER
backspace.addEventListener("click", () => {
    // code only runs when working with a not fully equated calculation, keeps user from backspacing a total
    if (!submitted){
        if (activeNums.innerText[activeNums.innerText.length -1] === "."){
            //if backspaced on a decimal, make available again
            decReset();
        }
        activeNums.innerText = activeNums.innerText.slice(0, activeNums.innerText.length - 1)

        if (!activeNums.innerText){
            buttonsCont.style.opacity = ".2";
        }
    }
})

// CLEAR BUTTON LISTENER 
clear.addEventListener("click", () => {
    // TODO: if cleared and decimal isn't active, return it to available
    // clear the activeNums strip
    activeNums.innerText = "";
    // set the opacity for whole container for clear and backspace lower to indicate disabled
    buttonsCont.style.opacity = ".2";
    // if backspaced was lowerd in opacity earlier, reset it's opacity
    backspace.style.opacity = "1"
    // return = button to original color
    submit.style.backgroundColor = '#4a4a4a';
    num1 = null;
    decReset();
})