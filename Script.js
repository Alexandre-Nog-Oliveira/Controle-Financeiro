const dummyTransactionsUl = document.querySelector('#Transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDispley = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTextName = document.querySelector('#text')
const inputAmount = document.querySelector('#amount')

const dummyTransactions = [
    {id: 1, name: "Bolo", amount: 20}
]


const addTransactionIntoDom = transaction => {

    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement("li")

    li.classList.add(CSSClass)
    li.innerHTML = `${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn" onClick="removeTransaction(${transaction.id})" >x</button>`
    dummyTransactionsUl.prepend(li)
}

const updateBalanceValues = () => {
    const transactionAmounts = dummyTransactions.map(transaction => transaction.amount)

    const total = transactionAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0)

    const income = transactionAmounts.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)

    const expense = Math.abs(transactionAmounts.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0)).toFixed(2)

    balanceDispley.textContent = `R$ ${total}`

    incomeDisplay.textContent = `R$ ${income}`

    expenseDisplay.textContent = `R$ ${expense}`

    console.log(income)
    
}

const init = () => {
    dummyTransactions.forEach(addTransactionIntoDom) 
    updateBalanceValues()
}

init()

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener("submit", event => {
    event.preventDefault()

    const transactionName = inputTextName.value.trim()
    const transactionAmount = inputAmount.value.trim()

    if (transactionName == '' || transactionAmount == ''){
        alert('Por favor preenchar o nome e o valor da transação')
        return 
    }

    const transaction = {
         id: generateID(),
         name: transactionName , 
         amount: +transactionAmount
         }

    console.log(transaction)

    init()
    dummyTransactions.push(transaction)

    inputTextName.value = ''
    inputAmount.value = ''

})