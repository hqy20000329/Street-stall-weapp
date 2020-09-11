const queryToString = (obj = {}) => {
    const res = []
    for(let key of Object.keys(obj)){
        res.push(key + '=' + obj[key])
    }
    return '?' + res.join('&')
}

module.exports = queryToString;