const transactionsUl = document.querySelector('#transactions');
const balanceDisplay = document.querySelector('#balance');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');

const form = document.querySelector('#form');
const inputName = document.querySelector('#text');
const inputAmount = document.querySelector('#amount');
const inputCategory = document.querySelector('#category');

let transactions = [];

// adicionar na tela
function addTransactionDOM(transaction) {
  const li = document.createElement('li');

  li.innerText =
    transaction.name +
    " (" + transaction.category + ") - " +
    transaction.amount;

  transactionsUl.appendChild(li);
}

// atualizar valores
function updateValues() {
  let total = 0;
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    total += t.amount;

    if (t.amount > 0) {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  balanceDisplay.innerText = total;
  incomeDisplay.innerText = income;
  expenseDisplay.innerText = Math.abs(expense);
}

// submit
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = inputName.value;
  const amount = Number(inputAmount.value);
  const category = inputCategory.value;

  if (!name || !amount || !category) {
    alert("Preencha tudo");
    return;
  }

  const transaction = {
    name: name,
    amount: amount,
    category: category
  };

  transactions.push(transaction);

  addTransactionDOM(transaction);
  updateValues();

  // limpar
  inputName.value = "";
  inputAmount.value = "";
  inputCategory.value = "";
});