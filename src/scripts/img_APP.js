const $img_cont = document.querySelector('div.img_cont');

$img_cont.addEventListener('pointerenter', function z_up(event) {
    let target = event.target;
    if (!target.dataset.side) return
        // console.log(`${target.dataset.side}`);
    if (target.dataset.side) {
        target.style.setProperty('z-index', 100);
        target.setAttribute('current', true);
    }
}, true);

$img_cont.addEventListener('pointerout', function z_down(event) {
    let target = event.target;
    if (!target.dataset.side) return
        // console.log(`${target.dataset.side}`);
    if (target.dataset.side) {
        target.removeAttribute('style')
        target.removeAttribute('current')
    }
}, true);