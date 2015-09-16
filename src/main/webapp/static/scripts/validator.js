/*请输入大于0的数字。*/
function gtzero(value) {
    return /^\d+/.test(value) && value > 0;
}
/*请输入数字。*/
function num(value) {
    value = Math.abs(value);
    return /^\d+/.test(value);
}
/*请输入整正数。*/
function pnum(value, param) {
    return /^\d+$/.test(value);
}
/*验证value是数组并且在min和max之间，包括min和max*/
function betweennum(value, min, max) {
    return /^\d+/.test(value) && value >= min && value <= max;
}

/* 判断是不是手机号码 */
function ismobile(value) {
    var myreg = /^1\d{10}$/;
    if (!myreg.test(value)) {
        return false;
    }
    return true;
}
