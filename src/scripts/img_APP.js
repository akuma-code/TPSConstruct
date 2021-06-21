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
        left: '[output=left]',
        top: '[output=top]',
        right: '[output=right]',
        bot: '[output=bot]',
        out: '[output=out]',
    }
    //! Обработчик на контейнер изображения
$img_cont.addEventListener('click', function(event) {
        let target = event.target;

        // if (target.classList.contains('img_cont')) {
        //     // $out.innerHTML = ''
        //     return
        // };
        $out.innerHTML = '';
        $out.insertAdjacentText('afterbegin', `${event.target.dataset.side || 'Selected'}: ${target.textContent || 'none('}`);
        // debugger
        $out.innerHTML = setOutput(target.tagName, target.textContent)

    }, true)
    //! ОБЩИЙ ОБРАБОТЧИК
$main.addEventListener('click', function(e) {
    let target = e.target;
    // if (target.matches('ul.side_content>li') || target.matches('ul.tps_sys_content>li')) {

    if (target.matches('li')) {

        document.querySelector(`${$outputelem[target.closest('ul').dataset.side]}`).innerText = target.textContent

        for (let elem of target.closest('ul').children) {
            elem.classList.remove('selected')
        }

        target.classList.add('selected');
    }
}, true)

function setOutput(target, text) {
    const $ul = `<ul>
<li>
    <span>EventTarget: ${target}</span>
</li>
<li>
    <span>Text: ${text}</span>
</li>

</ul>
`;

    return $ul
}