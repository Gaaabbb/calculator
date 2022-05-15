let button = document.querySelectorAll('.button')
const allButtons = document.querySelector('.allButtons')
const deleteButton = document.querySelector('.delete')
const operationDisplay = document.querySelector('.operationDisplay')
const solutionDisplay = document.querySelector('.solutionDisplay')
const validOperands = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '-', ]
const validOperators = ['+', '-', '*', '/', '×', '÷']
let firstOperand = ''
let secondOperand = ''
let operator = ''
let display = ''
let solution = ''

function add (a, b) {
    return a + b
}

function subtract (a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return a / b
}

function operate (a, b) {
    if (operator == '+') return add(a, b)
    else if (operator == '-') return subtract(a, b) 
    else if (operator == '*') return  multiply(a, b) 
    else if (operator == '/') return divide(a, b) 
}

function getSolution() {
    if (isValidToOperate()) {
        return `= ${operate(parseFloat(firstOperand), parseFloat(secondOperand))}`
    }
}

function deleteCharacter() {
    function deleteChar(e) {
        return e.toString().slice(0, -1)
    }
    if (secondOperand != '') secondOperand = deleteChar(secondOperand);
    else if (operator != '') operator = deleteChar(operator);
    else if (firstOperand != '') firstOperand = deleteChar(firstOperand);
}

function allClear() {
    firstOperand = ''
    secondOperand = ''
    operator = ''
    updateDisplay()
}

function updateDisplay() {
    display = `${firstOperand} ${convertToOperatorDisplay(operator)} ${secondOperand}`
    operationDisplay.textContent = display
    operationDisplay.scrollTo(operationDisplay.scrollWidth, 0)
    solution = getSolution()
    if (solution == undefined) {
        solution = ''
    }
    else if (operator == '/' && secondOperand == 0) {
        solution = "Can't divide by zero"
    }
    solutionDisplay.textContent = solution
}

function isKeyValidForOperand (operand, key) {
    if (key == '-' && operand.includes('-')) return '';
    else if (key == '.' && operand.includes('.')) return '';
    return key;
}

function isValidToOperate() {
    return (operator != '' && secondOperand != '.' && secondOperand != '-' 
    && secondOperand != '')
}

function isValidToPutToOperator() {
    return (firstOperand != '') && (firstOperand != "-") && (operator == '')
}

function moveToFirstOperand() {
    firstOperand = getSolution().substring(2)
    secondOperand = ''
    operator = ''
    solution = ''
}

function convertToOperator(e) {
    if (e == '') return ''
    else if (e == '+') return '+'
    else if (e == '-') return '-'
    else if (e == '×') return '*'
    else if (e == '÷') return '/'
}

function convertToOperatorDisplay(e) {
    if (operator == '') return ''
    else if (e == '+') return '+'
    else if (e == '-') return '-'
    else if (e == '*') return '×'
    else if (e == '/') return '÷'
}

window.addEventListener("keydown", (key) => {
    if (key.key == 'A' || key.key == 'a') allClear()
    else if ((key.key == 'Enter' || key.key == '=') && isValidToOperate()) {
        moveToFirstOperand()
        updateDisplay()
    }
    else if (key.key == 'Backspace' || key.key == 'Delete') {
        deleteCharacter()
        updateDisplay()
    }
    else if (validOperators.includes(key.key) && solution != '') {
        moveToFirstOperand()
        operator = key.key
        updateDisplay()
    }
    else if (validOperators.includes(key.key) && isValidToPutToOperator()) {
        operator += key.key;
        updateDisplay()
    }
    else if (validOperands.includes(key.key) && (operator == '')) {
        firstOperand += isKeyValidForOperand(firstOperand, key.key)
        updateDisplay()
    }
    else if (validOperands.includes(key.key) && operator != '') {
        secondOperand += isKeyValidForOperand(secondOperand, key.key)
        updateDisplay()
    }
})

button.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent == 'AC') allClear()
        else if ((button.textContent == '=') && isValidToOperate()) {
            moveToFirstOperand()
            updateDisplay()
        }
        else if (button.textContent == 'DEL') {
            deleteCharacter()
            updateDisplay()
        }
        else if (validOperators.includes(button.textContent) && solution != '') {
            moveToFirstOperand()
            operator = convertToOperator(button.textContent)
            updateDisplay()
        }
        else if (validOperators.includes(button.textContent) && isValidToPutToOperator()) {
            operator += convertToOperator(button.textContent);
            updateDisplay()
        }
        else if (validOperands.includes(button.textContent) && (operator == '')) {
            firstOperand += isKeyValidForOperand(firstOperand, button.textContent)
            updateDisplay()
        }
        else if (validOperands.includes(button.textContent) && operator != '') {
            secondOperand += isKeyValidForOperand(secondOperand, button.textContent)
            updateDisplay()
        }
    })
})