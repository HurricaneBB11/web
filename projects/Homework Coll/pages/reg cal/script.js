const resultInput = document.getElementById('result');
const historyDiv = document.getElementById('history');
let history = [];

function appendNumber(number) {
  resultInput.value += number;
}

function appendOperator(operator) {
  resultInput.value += operator;
}

function clearInput() {
  resultInput.value = '';
}

function calculate() {
  const expression = resultInput.value;
  const result = eval(expression);

  const historyItem = `${expression} = ${result}`;
  history.push(historyItem);

  const historyElement = document.createElement('p');
  historyElement.textContent = historyItem;
  historyDiv.appendChild(historyElement);

  resultInput.value = result;
}
