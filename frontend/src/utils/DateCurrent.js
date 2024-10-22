export function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

export function getCurrentTime() {
    const today = new Date();
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    const second = String(today.getSeconds()).padStart(2, '0');
    return `${hour}:${minute}:${second}`;
}

export function getMonthYear() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    return `${month}/${year}`;
}