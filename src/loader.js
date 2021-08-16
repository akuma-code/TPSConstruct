const Scripts = [
    // 'src/scripts/DB/SizeDB.js',
    // 'src/scripts/DB/zDB.js',
    // 'src/scripts/tps_calc1.js',
    // 'src/scripts/tps_calc.js',
    'src/scripts/module/helpers.js',
    'src/scripts/DB/dbTPSdelta.js',
    'src/scripts/module/calc/sizeModule.js',
    'src/scripts/tgl_btn.js',
    'src/scripts/TPSconstruct.js',
    'src/scripts/testclass.js',
    'src/scripts/img_APP.js',
];


function restoreValues() {
    const elements = document.querySelectorAll('[data-stdb]');
    for (let el of elements) {
        let elem_key = el.dataset.stdb;
        if (!elem_key) console.log('no key!');
        if (localStorage.getItem(elem_key)) {
            if (el.type === 'number') el.value = localStorage.getItem(elem_key)
            el.innerText = localStorage.getItem(elem_key)
        }
    }
    let SavedState = localStorage.getItem('bgState');

    const btns = document.querySelectorAll('.ts');
    for (let button of btns) {
        if (button.dataset.type_sel === SavedState) button.click()
    }

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

startAPP(Scripts, restoreValues());
const $StatusCheck = {};
const $img_conteiner = document.querySelector('.tps_img'),
    $img_cont = document.querySelector('div.img_cont'),
    $stateElem = document.querySelector('div[data-bg-state]'),
    $sys = document.querySelector('div.tps_sys'),
    $out = document.querySelector('div.tps_output'),
    $sides = document.querySelectorAll('.img_side'),
    $main = document.querySelector('div.tps_main'),
    $size = document.querySelector('div.tps_size'),
    $out_sizes = document.getElementById('out_sizes'),
    $tgl_btn = document.querySelector('div.tgl_big_box'),
    $stv232 = document.querySelector('#stv232'),
    $ms_simple = document.querySelector('#ms_simple'),
    $ms_skf = document.querySelector('#ms_skf'),
    $out_glass = document.querySelector('#out_glass');

const $outputelem = {
    system: '[output=system]',
    left: '[output=left]',
    top: '[output=top]',
    right: '[output=right]',
    bot: '[output=bot]',
    out: '[output=out]',
    depth: '[output=depth]',
    // bgState: '[output=bgState]',
};
const currentDepth = {
    ProLine: ['24mm', '28mm', '36mm', '40mm'],
    SoftLine: ['24mm', '28mm', '36mm', '40mm'],
    EuroLine: ['24mm', '32mm'],
    SoftLine82: ['40mm', '52mm'],
    WHS: ['24mm', '32mm'],
    WHS72: ['24mm', '32mm', '40mm'],
}

const outputList = {
    svet: ['out_sizes', 'ms_simple', 'ms_skf'],
    stv: ['out_glass', "out_stv", "out_shtap", 'out_sizes', 'ms_simple', 'ms_skf'],
    fix: ['out_glass', "out_stv", "out_shtap", 'out_sizes'],
    setup(state) {
        const $outlist = document.getElementsByClassName('outlist');
        for (let elem of $outlist) {
            if (!this[state].includes(elem.id)) elem.classList.add('disp_none')
            else elem.classList.remove('disp_none')
        }
    }
}