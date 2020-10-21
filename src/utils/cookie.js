/**
 *  Author: harry.lang
 *  Date: 17/3/9
 *  Description: Created by harrylang on 17/3/9.
 */
const dayMilliseconds = 24 * 60 * 60 * 1000; // 一天的毫秒数

function encode(str) {
    return encodeURIComponent(str);
}

function decode(str) {
    return decodeURIComponent(str);
}

function stringifyCookieValue(value) {
    if (typeof value == 'object') {
        value = JSON.stringify(value);
    }
    return encode(value);
}
function _cookie(key, value, options) {

    if (!key) {
        return;
    }
    // 写入cookie
    if (arguments.length > 1) {

        options = options || {};

        /*
        if (typeof options.expires === 'number') {
            var expireLength = options.expires,
                now = options.expires = new Date();
            now.setMilliseconds(now.getMilliseconds() + parseInt(expireLength));
        }
        */
        return document.cookie = [
            encode(key), '=', stringifyCookieValue(value),
            options.expires ? '; expires=' + new Date(options.expires).toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join('');
    }

    //读取cookie
    var result = undefined,
        cookies = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0, len = cookies.length; i < len; i++) {

        var parts = cookies[i].split('='),
            name = decode(parts[0]),
            cookie = decode(parts[1]);

        if (key === name) {
            result = decode(cookie);
            break;
        }
    }
    //不是对象时,返回null  如果是字符串,则返回eval后的内容
    if(result){
        var startChar = result.charAt(0);
        if(startChar && (startChar == '{' || startChar == '[')){
            return eval('('+result+')');
        }else{
            return result;
        }
    }
    return null;

}

export default _cookie;

export const setCookie = (...args)=> {
    return _cookie.apply(this, args);
};

export const getCookie = (key) => {
    return _cookie(key);
};

export const removeCookie = (key, options) => {
    options = options || {};
    options.expires = -1;
    _cookie(key, null, options);
    return !getCookie(key);
};

export const clearCookie = ()=> {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
};