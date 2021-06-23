//! TODO: класс, который навешивает на выпадающий список подсветку и цепляется к елементу по атрибуту
// TODO:повесить обработчик на дивы для создания списка выбора
// TODO: добавить обработчик на сайды, чтобы отображалось выбранное по клику
// TODO: функция для вывода информации списком на каждый клик

const $StatusCheck = {};
const $img_conteiner = document.querySelector('.tps_img');
const $img_cont = document.querySelector('div.img_cont');
const $sys = document.querySelector('div.tps_sys');
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
    depth: '[output=depth]',
};
const currentDepth = {
    ProLine: ['28mm', '36mm', '40mm'],
    SoftLine: ['28mm', '36mm', '40mm'],
    WHS: ['24mm', '30mm'],
}

document.body.addEventListener('mousemove', function(e) {
        let target = e.target;
        if (!target.matches('.tps_main *')) return
            // if (e.ctrlKey && e.altKey) target.classList.add('selected')
            // if (!(e.ctrlKey && e.altKey)) target.classList.remove('selected')

        const $t_out = document.querySelector('div.target_output > ul');
        const $Current = document.querySelector('li[data-target=current]>span');
        const $et = document.querySelector('li[data-target=etarget]>span');
        $Current.innerText = e.currentTarget.tagName;
        $et.innerText = target.className;
        document.querySelector('li[data-target=text]>span').innerText = target.innerText
    }, true)
    //! Обработчик на контейнер изображения
$img_cont.addEventListener('click', function(event) {
        let target = event.target;

        if (target.classList.contains('img_cont')) {
            $out.innerHTML = ''
            return
        };
        $out.innerHTML = '';
        $out.insertAdjacentText('afterbegin', `${event.target.dataset.side || 'Selected'}: ${target.textContent || 'none('}`);
        // debugger
        $out.innerHTML = setOutput(target.tagName, target.textContent)

    }, true)
    //! ОБЩИЙ ОБРАБОТЧИК
$main.addEventListener('click', function(e) {
    let target = e.target;


    //! выделение строки списка
    if (target.matches('li')) {
        let current_side = target.closest('ul').dataset.side;
        document.querySelector(`${$outputelem[current_side]}`).innerText = target.textContent
        $StatusCheck[current_side] = target.textContent;
        for (let elem of target.closest('ul').children) {
            elem.classList.remove('selected')
        }
        target.classList.add('selected');
    }
    //! толщина ст-пакета
    if (target.matches('[data-side=system] li')) {
        document.querySelector('[data-side=depth]').innerHTML = '';
        document.querySelector('[data-side=depth]').innerHTML = setDepth(target.textContent);

        $StatusCheck.system = target.textContent
    }

    if (target.matches('[data-side=depth] *')) {
        $StatusCheck.depth = target.textContent
    }
    //! настройка отображения детализации
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

function setDepth(system) {
    let list = '';
    currentDepth[system].forEach(element => list += `<li>${element}</li>`);
    return list
}