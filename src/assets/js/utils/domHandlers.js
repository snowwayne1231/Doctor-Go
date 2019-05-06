

export function sumOffset(dom, direction = 'top'){
    let newStartDom;
    let endDom;
    let num = 0;
    if (Array.isArray(dom)) {
        newStartDom = dom[0];
        endDom = dom[1];
    } else {
        newStartDom = dom;
    }
    
    while(newStartDom) {
        const add = getNum(newStartDom, direction) || 0;
        if (!add) { break; }
        num += add;
        
        newStartDom = newStartDom.offsetParent;
        if (endDom && newStartDom == endDom) { break; }
    }
    return num;

    function getNum(d, dire) {
        switch (dire) {
        case 'top': return d.offsetTop;
        case 'left': return d.offsetLeft;
        case 'width': return d.offsetWidth;
        case 'height': return d.offsetHeight;
        default:
        }
        return 0;
    }
}


export function getScrollParent(dom) {
    let next = dom;
    while(next) {
        if (next.scrollHeight > next.clientHeight) {
            break;
        }
        next = getParent(next);
    }

    return next;

    function getParent(d) {
        return d.parentElement || d.parentNode || d.offsetParent;
    }
}

