const $StatusCheck = {};
const $img_conteiner = document.querySelector('.tps_img');
const $img_cont = document.querySelector('div.img_cont');
const $sys = document.querySelector('div.tps_sys');
const $sys_content = document.querySelector('.tps_sys_content');
const $out = document.querySelector('div.tps_output');
const $sides = document.querySelectorAll('.img_side');
const $main = document.querySelector('div.tps_main');
const $size = document.querySelector('div.tps_size');
const $out_sizes = document.getElementById('out_sizes');
const $tgl_btn = document.querySelector('div.tps_tgl');

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

const Sidelist = {
        svet: {
            top: ['световой проем'],
            bot: ['световой проем'],
            left: ['световой проем'],
            right: ['световой проем'],
        },

        fix: {
            top: ['рама', 'импост'],
            bot: ['рама', 'импост', 'порог'],
            left: ['рама', 'импост'],
            right: ['рама', 'импост'],
        },

        stv: {
            top: ['рама', 'импост', 'импост в створке'],
            bot: ['рама', 'импост', 'импост в створке', 'порог'],
            left: ['рама', 'импост', 'штульп', 'импост в створке'],
            right: ['рама', 'импост', 'штульп', 'импост в створке'],
        },

        setup(tglStatus = '') {
            const sides = ['top', 'bot', 'left', 'right'];
            for (let side of sides) {
                let list = '';
                let $selector = document.querySelector(`ul.drop_content[data-side=${side}]`);
                this[tglStatus][side].forEach(element => list += `<li>${element}</li>`);
                $selector.innerHTML = '';
                $selector.insertAdjacentHTML('afterbegin', list)
            }
        },
    }
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
    document.querySelector('div.target_output > ul.target_list').innerHTML = "";
    document.querySelector('div.target_output > ul.target_list').insertAdjacentHTML("afterbegin", setStatusInfo())
        //! настройка отображения детализации
    if (target.matches('.tgl_big_item')) {
        if (target.matches('.tgl_big_item[data-tgl-status=info')) return
        for (let elem of target.closest('.tgl_big_box').children) {
            elem.classList.remove('active')
        }
        target.classList.add('active');
    }
}, true);

$size.addEventListener('input', function(e) {
    let t = e.target;
    if (!t.matches('.tps_size input')) return console.log('target error!');
    if (t.matches('#tps_w')) $StatusCheck.width = t.value;
    if (t.matches('#tps_h')) $StatusCheck.height = t.value;
    $out_sizes.innerHTML = '';
    $out_sizes.insertAdjacentHTML('beforeend', `<span>Размеры: </span><span>${$StatusCheck.width || '---'} мм х ${$StatusCheck.height || '---'} мм</span>`)
})

$tgl_btn.addEventListener('click', function(event) {
    let t = event.target;
    if (t.matches('[data-tgl-status=info]')) return
    if (t.matches('[data-tgl-status]')) Sidelist.setup(t.dataset.tglStatus);

})

function setDepth(system) {
    let list = '';
    currentDepth[system].forEach(element => list += `<li>${element}</li>`);
    return list
}

function setStatusInfo(StatusObject = $StatusCheck) {
    let result = '';
    for (let key in StatusObject) {
        result += `<li>${key}: ${StatusObject[key]}</li>`
    }
    return result
}

function tglActive(element) {
    element.classList.toggle('active')
}