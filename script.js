const resultText = document.querySelector('.result__text');
const buttons = document.querySelectorAll('button');
const clear = document.querySelector('.clear');
const sectionMiddle = document.querySelector('.section__middle');
const menuButton = document.querySelector('.menu__button');
const result = document.querySelector('.result');
const symbols = ['+', '-', '*', '/', '%'];
let firstNum = 0,
  secondNum = 0;

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const val = event.target.value;
    const inputVal = +resultText.textContent;
    const lengthOfInput = resultText.textContent.length;
    if (inputVal === 0 && +val === 0) {
      return;
    }
    if (inputVal === 0 && +val !== 0) {
      if (val === 'clear' || val === '+' || val === '-' || val === '*' || val === '/' || val === '=' || val === '+/-' || val === '%' || val === '.') {
        clear.innerHTML = 'AC';
        resultText.textContent = 0;
        return resultText.textContent;
      }
      clear.innerHTML = 'C';
      resultText.textContent = +val;
      return;
    }
    if (val === 'clear') {
      clear.innerHTML = 'AC';
      resultText.textContent = 0;
      return resultText.textContent;
    }
    
    if (val === '+/-' && lengthOfInput < 12) {
      if (resultText.textContent.indexOf('-') !== -1) {
        resultText.textContent = resultText.textContent.replace('-', '');
      } else {
        resultText.textContent = '-' + resultText.textContent;
      }
      return resultText.textContent;
    }
    
    if (lengthOfInput < 12) {
      if (val === '+' || val === '-' || val === '*' || val === '/' || val === '%' || val === '.') {
        if (resultText.textContent.indexOf(val) !== -1) {
          return;
        }
        resultText.textContent += val;
        return resultText.textContent;
      }
      resultText.textContent += val; 
      if (val === '=') {
        symbols.forEach(symbol => {
          if (resultText.textContent.indexOf(symbol) !== -1) {
            firstNum = +resultText.textContent.slice(0, resultText.textContent.indexOf(symbol));
            secondNum = +resultText.textContent.slice(resultText.textContent.indexOf(symbol) + 1, resultText.textContent.indexOf('='));
            if (secondNum === 0 && symbol === '/') {
              resultText.textContent = 'Infinity';
              return resultText.textContent;
            }
            resultText.textContent = calculate(firstNum, secondNum, symbol);
          }
        })
        return resultText.textContent;
        
      }
    } else {
      resultText.textContent = 'limit exceeded';
    }
  });
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (a % b === 1) {
    return (a / b).toFixed(2);
  }
  return a / b;
}

function percent(a, b) {
  let per = (a / 100) * b;
  if (per < 1) {
    return (per).toFixed(2);
  }
  return per;
}

function calculate(a, b, symbol) {
  switch (symbol) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    case '%':
      return percent(a, b);
    default:
      break;
  }
}

menuButton.addEventListener('click', () => {
  result.style.display = 'none';
  buttons.forEach(button => {
    button.style.display = 'none';
  });
  sectionMiddle.classList.toggle('active');
});

menuButton.addEventListener('dblclick', () => {
  result.style.display = 'flex';
  buttons.forEach(button => {
    button.style.display = 'flex';
  });
  sectionMiddle.classList.toggle('active');
});