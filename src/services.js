export function getAccounts() {
    return fetch('http://localhost:8081/accounts');
}


export function deleteAccount(account) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch(`http://localhost:8081/accounts/${account._id}`, requestOptions)
    .then(response => response.json())
}

export function updateAccount(account) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(account)
    };
    return fetch(`http://localhost:8081/accounts/${account._id}`, requestOptions)
    .then(response => response.json())
}

export function addAccount(account) {
    const accountToPost = {
        name : account.name,
        amount: account.amount
    }
    console.log(accountToPost);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountToPost)
    };
    console.log(requestOptions);
    return fetch(`http://localhost:8081/accounts`, requestOptions)
    .then(response => response.json())
}

export function getOperations() {
    return fetch('http://localhost:8081/account/1/operations');
}