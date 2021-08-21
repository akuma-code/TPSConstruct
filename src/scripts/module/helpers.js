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

function logdelay(delay) {
    return function(text) {
        setTimeout(() => console.log(text), delay)
    };
}
let log100 = logdelay(1000);

function debounce(func, delay) {
    let isCooldown = false;
    console.log(isCooldown)
    return function() {
        if (isCooldown) return;
        func.apply(this, arguments);
        isCooldown = true;
        console.log(isCooldown)
        setTimeout(() => isCooldown = false, delay)
    }

};

function throttle(func, ms) {

    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}


let log500 = debounce(console.log, 500);
let t1000 = throttle(console.count, 1000)