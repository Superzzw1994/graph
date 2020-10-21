function KMPMatch(str,pattern){
    var next = generateNextArr(pattern)
    var i=0; // str 指针
    var j=0; // pattern指针
    while(i<str.length && j< pattern.length){
        if(str[i]===pattern[j] || j===-1){
            i++;
            j++;
        }else{
            j = next[j] // 右移
        }
    }
    if(j===pattern.length){
        return i-j
    }else{
        return -1
    }
}

function generateNextArr(pattern){
    var i = 0;
    var j = -1;
    var next = []
    next[0]=-1
    while(i<pattern.length){
        if(j===-1||pattern[i]===pattern[j]){
            i++;
            j++;
            next[i]=j
        }else{
            j = next[j]
        }
    }
    return next;
}

export default KMPMatch