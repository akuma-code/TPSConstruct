const Scripts = [
    'src/scripts/TPSconstruct.js',
    'src/scripts/model.js',
    'src/scripts/DB/SizeDB.js',
    'src/scripts/DB/zDB.js',
]

Scripts.forEach(item => load(item));



function load(src) {
    let $scr = document.createElement('script');
    $scr.src = src;
    document.head.append($scr);
}