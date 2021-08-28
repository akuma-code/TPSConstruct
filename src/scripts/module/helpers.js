function updateHTML(HTMLelement, text) {
    HTMLelement.innerHTML = '';
    HTMLelement.insertAdjacentHTML('beforeend', text)
    return
}
const getState = function() {
    function state() {
        //@ts-ignore
        const state = $stateElem.dataset.bgState
        if (state === 'undefined') alert('Invalid State!')
        return state
    };

    function system() {
        const sys = document.querySelector('span[output=system]');
        if (sys == 'system') alert('System not set!')
        return sys.textContent
    };

    return {
        type: state(),
        system: system()
    }
};

function rename(text) {
    const dictionary = {
        'импост': 'di',
        'рама': 'dr',
        'порог': 'd_porog',
        'штульп': 'd_shtulp',
        ['импост в створке']: 'di_stv',
        ['свет']: 'svet'
    }
    if (!dictionary[text]) return
    return dictionary[text]
};




function debounce(func, delay) {
    let isCooldown = false,
        savedArgs,
        savedThis;


    function bounce() {
        if (isCooldown) {
            savedThis = this;
            savedArgs = arguments;
            return
        };

        func.apply(this, arguments);

        isCooldown = true;
        setTimeout(function() {
            if (savedArgs) {
                bounce.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
            isCooldown = false
        }, delay)
    }

    return bounce
};

function spanResult(w, h) {
    return `<span><b>${w}</b> x <b>${h}</b> мм</span>`
};

const square = (w, h) => Math.round(w / 100 * h / 100) / 100;

function sqResult(w, h) {
    return `<span><b>${square(w,h)}</b> кв.м</span>`
};

function destructor(obj) {
    let resultObj = {};
    resultObj.glass = {};
    const str = JSON.stringify(Object.fromEntries(obj));
    JSON.parse(str, function(key, value) {
        if (key === "gw" || key === 'gh') resultObj.glass[key] = value;

    });
    return console.table(resultObj)
};