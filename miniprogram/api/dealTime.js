const dayTimeFormat = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay()
    return year + '.' + month + '.' +day;
}

const minuteTimeFormat = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return year + '.' + month + '.' + day + ' ' + hour + ':' + minute;
}
module.exports = {
    dayTimeFormat,
    minuteTimeFormat,
};