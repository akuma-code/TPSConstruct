const Scripts = [
    'src/scripts/DB/dbTPSdelta.js',
    // 'src/scripts/model.js',
    // 'src/scripts/DB/SizeDB.js',
    // 'src/scripts/DB/zDB.js',
    'src/scripts/tgl_btn.js',
    'src/scripts/TPSconstruct.js',
    'src/scripts/tps_calc.js',
    'src/scripts/img_APP.js',
]

// Scripts.forEach(item => load(item));
// 
// restoreValues()

function restoreValues() {
    const elements = document.querySelectorAll('[data-stdb]');
    for (let el of elements) {
        let elem_key = el.dataset.stdb;
        if (!elem_key) console.log('no key!');
        if (localStorage.getItem(elem_key)) {
            if (el.type === 'number') el.value = localStorage.getItem(elem_key)
            el.innerText = localStorage.getItem(elem_key)
            $StatusCheck[elem_key] = localStorage.getItem(elem_key)
        }
    }
    const statusbtn = localStorage.getItem('tglState') && document.querySelector(`[data-tgl-status=${localStorage.getItem('tglState')}]`);
    //@ts-ignore
    localStorage.getItem('tglState') && statusbtn.click();
    return this
}

function load(src) {
    let $scr = document.createElement('script');
    $scr.src = src;
    document.head.append($scr);
}

function startAPP(scripts, callback) {
    scripts.forEach(item => load(item));
    document.onload = () => callback()
}

startAPP(Scripts, restoreValues)