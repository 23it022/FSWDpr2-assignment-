let expenses = [];


function addExpense(description, amount, date) {
    try {
        validateExpense(description, amount, date);
        
        const expense = { description, amount, date };
        expenses.push(expense);
        updateTotalExpenses();
    } catch (error) {
        displayError('Error adding expense: ' + error.message);
    }
}

function validateExpense(description, amount, date) {
    if (typeof description !== 'string' || description.trim() === '') {
        throw new Error('Description must be a non-empty string.');
    }
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Amount must be a positive number.');
    }
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Date must be a valid Date object.');
    }
}


function totalExpenses() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function updateTotalExpenses() {
    document.getElementById('total-expenses').innerText = totalExpenses().toFixed(2);
}


function fetchExpenseReport() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (expenses.length === 0) {
                reject(new Error('No expenses found.'));
            } else {
                resolve(expenses);
            }
        }, 1000);
    });
}


function displayError(message) {
    console.error(message);
    document.getElementById('report').innerText = message;
}


document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = new Date(document.getElementById('date').value);
    
    addExpense(description, amount, date);
    

    this.reset();
});


document.getElementById('fetch-report').addEventListener('click', function() {
    fetchExpenseReport()
        .then(report => {
            document.getElementById('report').innerText = JSON.stringify(report, null, 2);
        })
        .catch(error => {
            displayError(error.message);
        });
});