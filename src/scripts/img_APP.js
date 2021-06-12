const $img_cont = document.querySelector('div.img_cont');

$img_cont.addEventListener('pointerenter', function z_up(event) {
    let target = event.target;
    if (!target.dataset.side) return
        // console.log(`${target.dataset.side}`);
    if (target.dataset.side || target.tagName === 'p') {
        target.style.setProperty('z-index', 100);
        target.setAttribute('current', true);
    }
}, true);

$img_cont.addEventListener('pointerout', function z_down(event) {
    let target = event.target;
    if (!target.dataset.side) return
        // console.log(`${target.dataset.side}`);
    if (target.dataset.side || target.tagName === 'p') {
        target.removeAttribute('style')
        target.removeAttribute('current')
    }
}, true);

const $img_conteiner = document.querySelector('.img_cont');

$img_conteiner.addEventListener('pointerenter', function(event) {
    let target = event.target;
    // if (target.tagName !== 'p' || 'div') return;
    let $out = document.querySelector('div.tps_output');
    $out.innerHTML = `${target.tagName}>>
${target.textContent}`;
}, true)