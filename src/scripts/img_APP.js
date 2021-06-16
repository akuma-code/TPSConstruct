const $img_conteiner = document.querySelector('.tps_img');
const $img_cont = document.querySelector('div.img_cont');
const $sys = document.querySelector('div.tps_sys>span');
const $syscontent = document.querySelector('.tps_sys_content');
//!----------<<<-----------повесить обработчик на дивы для создания списка выбора------------->>>-------------//



$img_conteiner.addEventListener('pointerenter', function(event) {
    let target = event.target;
    // if (target.tagName !== 'p' || 'div') return;
    let $out = document.querySelector('div.tps_output');
    $out.innerHTML = '';
    $out.insertAdjacentText('afterbegin', `<${target.tagName}> ${target.textContent || 'none('}`)

}, true)

$syscontent.addEventListener('click', function(event) {
    let target = event.target;
    $sys.innerText = '';
    for (let item of $syscontent.children) {
        item.classList.remove('selected')
    }
    target.classList.add('selected')
    $sys.insertAdjacentHTML('afterbegin', target.textContent)
        // if (target.classList.has('tps_sys_content')) {    }
}, true)





//TODO: добавить обработчик на сайды, чтобы отображалось выбранное по клику






//
// $img_cont.addEventListener('pointerenter', function z_up(event) {
//     let target = event.target;
//     if (!target.dataset.side) return
//         // console.log(`${target.dataset.side}`);
//     if (target.dataset.side || target.tagName === 'p') {
//         target.style.setProperty('z-index', 100);
//         target.setAttribute('current', true);
//     }
// }, true);
// 
// $img_cont.addEventListener('pointerout', function z_down(event) {
//     let target = event.target;
//     if (!target.dataset.side) return
//         // console.log(`${target.dataset.side}`);
//     if (target.dataset.side || target.tagName === 'p') {
//         target.removeAttribute('style')
//         target.removeAttribute('current')
//     }
// }, true);