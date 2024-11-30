function getDay(date) {
    return date.getDate();
}

function getMonth(date) {
    return date.getMonth() + 1;
}

function getYear(date) {
    return date.getFullYear();
}

function getHour(date) {
    return date.getHours();
}

function getMinute(date) {
    return date.getMinutes();
}

function getSecond(date) {
    return date.getSeconds();
}

function getDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getTime(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${hour}:${minute}:${second}`;
}

function getDateTime(date) {
    return `${getDate(date)} ${getTime(date)}`;
}

module.exports = {
    getDay,
    getMonth,
    getYear,
    getHour,
    getMinute,
    getSecond,
    getDate,
    getTime,
    getDateTime,
}