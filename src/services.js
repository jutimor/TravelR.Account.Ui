export function getAccounts() {
    return fetch('http://localhost:8081/accounts');
}

export function getOperations() {
    return fetch('http://localhost:8081/account/1/operations');
}