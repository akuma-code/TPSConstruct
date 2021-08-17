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