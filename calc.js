
let displayValue = document.querySelector('.result');
let currentValue = "";
let currentOperator = "";
let pressedEquals;

//number buttons
const numbers = document.querySelectorAll('.number');
displayNumber();

//operator buttons
const operatorBtns = document.querySelectorAll('.operator');
selectOperator();

//decimal button
const decimalBtn = document.querySelector('#decimal');
makeDecimal();

// equals button
const equalsBtn = document.querySelector('#equals');
getResult();

//AC button
const allClearBtn = document.querySelector('#allClear');
clearDisplay();

//CE button
const clearEntryBtn = document.querySelector('#clearEntry');
backSpace();

//plus-minus button
const plusMinusBtn = document.querySelector('#signChange');
plusMinusBtn.addEventListener('click', () => displayValue.textContent = -displayValue.textContent);


function operate(operator, a ,b){
    const add = (a,b) => a + b;
    const subtract = (a,b) => a - b;
    const multiply = (a,b) => a * b;
    const divide = (a,b) => a / b;
    if(operator == 'add') return Math.round(add(a,b)*1000) / 1000;
    if(operator == 'subtract') return Math.round(subtract(a,b)*1000) / 1000;
    if(operator == 'multiply') return Math.round(multiply(a,b)*1000) / 1000;
    if(operator == 'divide') return Math.round(divide(a,b)*1000) / 1000;
}

function displayNumber(){
    numbers.forEach((number) => {
        number.addEventListener('click', () => {
        if(displayValue.textContent == "" && number.textContent == 0){
            return;
        }

        if(currentOperator != "" && currentValue == ""){
            currentValue = displayValue.textContent;
            displayValue.textContent = "";
        }

        if(pressedEquals){
            displayValue.textContent = "";
            pressedEquals = false;
        }

        displayValue.textContent = `${displayValue.textContent + number.textContent}`;

        });
    });
}

function selectOperator(){
    operatorBtns.forEach((operator) => {
        operator.addEventListener('click', () => {
            if (currentOperator != "" && currentValue != ""){
                displayValue.textContent = operate(currentOperator, parseFloat(currentValue), parseFloat(displayValue.textContent));
                currentValue = "";
            }

            if (displayValue.textContent) currentOperator = `${operator.id}`;

            displayValue.textContent = `${displayValue.textContent + operator.textContent}`;

        });
    })
}

function getResult(){
    equalsBtn.addEventListener('click', () => {
        if(currentValue != ""){
            displayValue.textContent = operate(currentOperator, parseFloat(currentValue), parseFloat(displayValue.textContent));
            currentValue = "";
            currentOperator = "";
            pressedEquals = true;
        }
    });
}

function clearDisplay(){
    allClearBtn.addEventListener('click', () => {
        displayValue.textContent = "";
        currentOperator = "";
        currentValue = "";
    });
}

function backSpace(){
    clearEntryBtn.addEventListener('click', () => {
        displayValue.textContent = displayValue.textContent.toString().slice(0, -1);
    });
}

function makeDecimal(){
    decimalBtn.addEventListener('click', () => {
        if(displayValue.textContent.slice(-1) != '.'){
            displayValue.textContent += '.';
        }
    });
}