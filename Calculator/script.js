// script.js

const inputValue = document.getElementById('user-input');
const historyList = document.getElementById('history-list');
let currentInput = '';
let calculationHistory = [];

document.querySelectorAll('.numbers').forEach(item => {
    item.addEventListener('click', function (e) {
        handleNumberInput(e.target.innerHTML.trim());
    });
});

document.querySelectorAll('.operations').forEach(item => {
    item.addEventListener('click', function (e) {
        handleOperation(e.target.getAttribute('data-action'), e.target.innerHTML.trim());
    });
});

// Add event listener for keyboard input
document.addEventListener('keydown', function (e) {
    if (!isNaN(e.key) || e.key === '.') {
        handleNumberInput(e.key);
    } else {
        switch (e.key) {
            case 'Enter':
                handleOperation('calculate', '=');
                break;
            case 'Backspace':
                handleOperation('delete');
                break;
            case 'Escape':
                handleOperation('clear');
                break;
            case '/':
                handleOperation('divide', '/');
                break;
            case '*':
                handleOperation('multiply', '*');
                break;
            case '-':
                handleOperation('subtract', '-');
                break;
            case '+':
                handleOperation('add', '+');
                break;
            case '%':
                handleOperation('percent');
                break;
        }
    }
});

function handleNumberInput(value) {
    if (inputValue.innerText === "0" || inputValue.innerText === "NaN") {
        inputValue.innerText = "";
    }
    currentInput += value;
    inputValue.innerText = currentInput;
}

function handleOperation(action, symbol = '') {
    let lastChar = currentInput.slice(-1);

    switch (action) {
        case 'clear':
            currentInput = '';
            inputValue.innerText = '0';
            break;
        case 'delete':
            currentInput = currentInput.slice(0, -1) || '0';
            inputValue.innerText = currentInput;
            break;
        case 'percent':
            if (!isNaN(lastChar)) {
                currentInput = (parseFloat(currentInput) / 100).toString();
                inputValue.innerText = currentInput;
            }
            break;
        case 'calculate':
            try {
                if (!isNaN(lastChar)) {
                    let result = eval(currentInput);
                    if (result === Infinity || isNaN(result)) {
                        result = "NaN";
                    }
                    calculationHistory.push(`${currentInput} = ${result}`);
                    updateHistory();
                    currentInput = result.toString();
                    inputValue.innerText = currentInput;
                }
            } catch (error) {
                inputValue.innerText = "NaN";
                currentInput = '';
            }
            break;
        default:
            if (!isNaN(lastChar)) {
                currentInput += symbol;
                inputValue.innerText = currentInput;
            }
            break;
    }
}

function updateHistory() {
    historyList.innerHTML = calculationHistory.map(entry => `<li>${entry}</li>`).join('');
}
