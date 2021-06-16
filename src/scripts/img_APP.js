const $img_conteiner = document.querySelector('.tps_img');
const $img_cont = document.querySelector('div.img_cont');
const $sys = document.querySelector('div.tps_sys>span');
const $sys_content = document.querySelector('.tps_sys_content');
const $out = document.querySelector('div.tps_output');
const $sides = document.querySelectorAll('.img_side');
//!----------<<<-----------повесить обработчик на дивы для создания списка выбора------------->>>-------------//



$img_cont.addEventListener('click', function(event) {
    let target = event.target;

    if (target.classList.contains('img_cont')) {
        $out.innerHTML = ''
        return
    };
    $out.innerHTML = '';
    $out.insertAdjacentText('afterbegin', `${event.target.dataset.side || 'Selected'}: ${target.textContent || 'none('}`);




}, true)

$sys_content.addEventListener('click', function(event) {
    let target = event.target;
    $out.innerHTML = target.tagName;
    $sys.innerText = '';
    for (let item of $sys_content.children) {
        item.classList.remove('selected')
        item.style.setProperty('font-size', '1rem')
        item.style.setProperty('background-color', 'aqua')
    }
    target.classList.add('selected');
    target.style.setProperty('font-size', '1.3rem')
    target.style.setProperty('background-color', 'brown')
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