const { padZeros } = require("./padZeros.js");

const formatDate = (unformattedDate) => {
    const date = new Date(unformattedDate);
    return `${date.getFullYear()}-${padZeros(date.getMonth() + 1)}-${padZeros(date.getDay())} ${padZeros(date.getHours())}:${padZeros(date.getMinutes())}:${padZeros(date.getSeconds())}`;
}

module.exports = { formatDate };
