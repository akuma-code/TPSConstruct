const Scripts = [
    'src/scripts/img_APP.js',
    'src/scripts/tps_calc.js',
    'src/scripts/TPSconstruct.js',
    // 'src/scripts/model.js',
    // 'src/scripts/DB/SizeDB.js',
    // 'src/scripts/DB/zDB.js',
    'src/scripts/tgl_btn.js',
]

Scripts.forEach(item => load(item));



function load(src) {
    let $scr = document.createElement('script');
    $scr.src = src;
    document.head.append($scr);
}