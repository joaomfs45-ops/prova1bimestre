const transactionsUl = document.querySelector('#transactions');
const balanceDisplay = document.querySelector('#balance');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');

const form = document.querySelector('#form');
const inputName = document.querySelector('#text');
const inputAmount = document.querySelector('#amount');
const inputCategory = document.querySelector('#category');

let transactions = [];

// Renderizar lista
function addTransactionDOM(transaction) {
  const li = document.createElement('li');

  if (Math.abs(transaction.amount) > 100) {
    li.classList.add('high');
  }

  li.innerHTML = `
    <span onclick="editTransaction(${transaction.id})">
      ${transaction.name} (${transaction.category}) - R$ ${transaction.amount}
    </span>
    <div class="actions">
      <button onclick="removeTransaction(${transaction.id})">❌</button>
    </div>
  `;

  transactionsUl.appendChild(li);
}

// Atualizar valores
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

  balanceDisplay.innerText = `R$ ${total}`;
  incomeDisplay.innerText = `R$ ${income}`;
  expenseDisplay.innerText = `R$ ${Math.abs(expense)}`;
}

// Recarregar tudo
function init() {
  transactionsUl.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Adicionar
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = inputName.value;
  const amount = Number(inputAmount.value);
  const category = inputCategory.value;

  if (!name || !amount || !category) {
    alert("Preencha todos os campos");
    return;
  }

  const transaction = {
    id: Date.now(),
    name: name,
    amount: amount,
    category: category
  };

  transactions.push(transaction);

  init();

  inputName.value = "";
  inputAmount.value = "";
  inputCategory.value = "";
});

// Remover
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  init();
}

// Editar
function editTransaction(id) {
  const transaction = transactions.find(t => t.id === id);

  const newName = prompt("Editar descrição:", transaction.name);
  const newAmount = prompt("Editar valor:", transaction.amount);
  const newCategory = prompt("Editar categoria:", transaction.category);

  if (!newName || !newAmount || !newCategory) return;

  transaction.name = newName;
  transaction.amount = Number(newAmount);
  transaction.category = newCategory;

  init();
}