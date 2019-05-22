
const logging = window.console.log;
const notNetscape = window.navigator.appName != 'Netscape';
let debugMode = process.env.NODE_ENV === 'development' ? 1 : 0;
let debugBlock;
let container;


function debug() {
    // console.trace(1);
    if (debugMode === 0 && notNetscape) return;
    const nextArguments = foreach(arguments).map(e => {
        return Array.isArray(e)
            ? JSON.parse(JSON.stringify(e))
            : e;
    });

    if (debugBlock) {
        // console.log(nextArguments);
        nextArguments.map(e => {
            const type = typeof e;
            switch(type) {
            case 'string': case 'number': case 'boolean':
                debugBlock.childNodes[1].appendChild(jsonFormatDebugList(e, type));
                break;
            default:
                debugBlock.childNodes[1].appendChild(jsonFormatDebugList(e));
            }
        });
        
    }

    nextArguments.splice(0, 0, '%c [DEBUG]', 'color: #ff00cc');
    
    const err = new Error();
    const stack = err.stack.replace(/error[\w\W]+?\)/i, '');
    const gap = '\r\n    ';
    let ary = stack.split(' at ').map(e => e.trim()).filter(e => !!e);

    if (debugMode <= 1) {
        ary = ary.slice(0,1);
    }
    
    nextArguments.push(gap + ary.join(gap));


    logging.apply(
        this,
        nextArguments,
    );
};

function jsonFormatDebugList(object, type) {
    const sourceData = object;
    const div = document.createElement('div');
    div.style.borderBottom = '1px solid #fff';
    if (type) {
        div.innerHTML = `${sourceData}`;
        div.style.color = getColorByType(type);
        
    } else if(object) {
        div.appendChild(sub('Object', sourceData));
    } else {
        div.innerHTML = 'null';
        div.style.color = '#666';
    }
    
    return div;

    function sub(name, data) {
        const dl = document.createElement('dl');
        dl.style.margin = '5px';
        const type = typeof data;
        let value = '';
        if (data) {
            switch(type) {
            case 'string': case 'number': case 'boolean':
                dl.style.color = getColorByType(type);
                value = `: ${data}`;
                break;
            default:
                dl.style.color = '#ffffff';
                dl.onclick = callBack;
            }
            const constructorName = data.constructor
                ? ` (${data.constructor.name})`
                : '';
            
            dl.innerHTML = `<dt>${name}${constructorName} ${value}</dt><dd></dd>`;
        } else {
            dl.style.color = '#666';
            dl.innerHTML = `<dt>${name}: null</dt>`;
        }
        
        return dl;

        function callBack(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            const dl = evt.target.closest('dl');
            const dd = dl.childNodes[1];
            // console.log([dl, dd]);
            const keys = Object.keys(data);
            // console.log(keys);
            if (dd.childNodes.length === 0) {
                keys.map(key => {
                    const subData = data[key];
                    dd.appendChild(sub(key, subData));
                });
            } else {
                while (dd.firstChild) {
                    dd.removeChild(dd.firstChild);
                }
            }
        }
    }

    function getColorByType(type) {
        switch (type) {
        case 'string': return '#d66018';
        case 'number': return '#f13a3a';
        case 'boolean': return '#5389ef';
        default: return '#ffffff';
        }
    }
}


export function settingDebug({device, mode}) {
    if (mode) debugMode = mode;

    if (debugMode > 0 && device.uuid) {
        if (window && document) {
            debugBlock = document.createElement('div');
            debugBlock.className = 'debug-block';
            const closeBtn = document.createElement('b');
            container = document.createElement('div');
            closeBtn.className = 'fa fa-code';
            closeBtn.style.position = 'absolute';
            closeBtn.style.right = '2px';
            closeBtn.style.top = '0px';
            closeBtn.style.fontSize = '36px';
    
            container.style.overflow = 'auto';
            container.style.height = '100%';
            container.style.paddingTop = '36px';
            container.style.boxSizing = 'border-box';
            
            
            const style = {
                position: 'fixed',
                zIndex: 9999,
                color: '#ffffff',
                backgroundColor: 'rgba(0,0,0,0.8)',
                transition: 'all 0.5s ease 0s',
            };

            closeBlock();
    
            Object.keys(style).map(key => {
                debugBlock.style[key] = style[key];
            });
    
            debugBlock.appendChild(closeBtn);
            debugBlock.appendChild(container);
    
            closeBtn.addEventListener('click', () => {
                if (debugBlock.className.indexOf('close') == -1) {
                    closeBlock();
                } else {
                    openBlock();
                }
                
            });
            document.body.appendChild(debugBlock);
        }
    }

    function closeBlock() {
        debugBlock.classList.add('close');
        debugBlock.style.height = '5vh';
        debugBlock.style.overflow = 'hidden';
        debugBlock.style.right = '1vw';
        debugBlock.style.top = '1vh';
        debugBlock.style.width = '12vw';
    }

    function openBlock() {
        debugBlock.classList.remove('close');
        debugBlock.style.height = '80vh';
        debugBlock.style.overflow = '';
        debugBlock.style.right = '10vw';
        debugBlock.style.top = '5vh';
        debugBlock.style.width = '80vw';
        container.scrollTo(0, container.scrollHeight);
    }
}

export default debug;
