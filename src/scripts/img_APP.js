//! TODO: класс, который навешивает на выпадающий список подсветку и цепляется к елементу по атрибуту
// TODO:повесить обработчик на дивы для создания списка выбора
// TODO: добавить обработчик на сайды, чтобы отображалось выбранное по клику
// TODO: функция для вывода информации списком на каждый клик


const $img_conteiner = document.querySelector('.tps_img');
const $img_cont = document.querySelector('div.img_cont');
const $sys = document.querySelector('div.tps_sys>span');
const $sys_content = document.querySelector('.tps_sys_content');
const $out = document.querySelector('div.tps_output');
const $sides = document.querySelectorAll('.img_side');
const $main = document.querySelector('div.tps_main');
const $outputelem = {
    system: '[output=system]',
    leftside: '[output=leftside]',
    topside: '[output=topside]',
    rightside: '[output=rightside]',
    botside: '[output=botside]',
    out: '[output=out]',

}

$img_cont.addEventListener('click', function(event) {
    let target = event.target;

    if (target.classList.contains('img_cont')) {
        $out.innerHTML = ''
        return
    };
    $out.innerHTML = '';
    $out.insertAdjacentText('afterbegin', `${event.target.dataset.side || 'Selected'}: ${target.textContent || 'none('}`);

}, true)

$main.addEventListener('click', function(e) {
    let target = e.target;
    // if (target.matches('ul.side_content>li') || target.matches('ul.tps_sys_content>li')) {

    if (target.matches('li')) {

        document.querySelector(`${$outputelem[target.dataset.outtype]}`).innerText = target.textContent




        for (let elem of target.closest('ul').children) {
            // elem.classList.remove('selected')
            elem.removeAttribute('class')
        }

        target.classList.add('selected');

    }

    return


}, true)

// $sys_content.addEventListener('click', function(event) {
//     let target = event.target;
//     $out.innerHTML = target.tagName;
//     $sys.innerText = '';
//     for (let item of $sys_content.children) {
//         item.classList.remove('selected')
//             // item.style.setProperty('font-size', '1rem')
//             // item.style.setProperty('background-color', 'aqua')
//     }
//     target.classList.add('selected');
//     // target.style.setProperty('font-size', '1.3rem')
//     // target.style.setProperty('background-color', 'brown')
//     $sys.insertAdjacentHTML('afterbegin', target.textContent)
//         // if (target.classList.has('tps_sys_content')) {    }
// }, true)