const $StatusCheck = {};
const $img_conteiner = document.querySelector('.tps_img'),
    $img_cont = document.querySelector('div.img_cont'),
    $sys = document.querySelector('div.tps_sys'),
    $out = document.querySelector('div.tps_output'),
    $sides = document.querySelectorAll('.img_side'),
    $main = document.querySelector('div.tps_main'),
    $size = document.querySelector('div.tps_size'),
    $out_sizes = document.getElementById('out_sizes'),
    $tgl_btn = document.querySelector('div.tps_tgl'),
    $stv232 = document.querySelector('#stv232'),
    $ms_simple = document.querySelector('#ms_simple'),
    $ms_skf = document.querySelector('#ms_skf');

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
    ProLine: ['24mm', '28mm', '36mm', '40mm'],
    SoftLine: ['24mm', '28mm', '36mm', '40mm'],
    EuroLine: ['24mm', '32mm'],
    SoftLine82: ['40mm', '52mm'],
    WHS: ['24mm', '32mm'],
    WHS72: ['24mm', '32mm', '40mm'],
}

const outputList = {
    svet: ['out_sizes', 'ms_simple', 'ms_skf'],
    stv: ['out_glass', "out_stv", "out_shtap", 'out_sizes', 'ms_simple', 'ms_skf'],
    fix: ['out_glass', "out_stv", "out_shtap", 'out_sizes'],
    setup(state) {
        const $outlist = document.getElementsByClassName('outlist');
        for (let elem of $outlist) {
            if (!this[state].includes(elem.id)) elem.classList.add('disp_none')
            else elem.classList.remove('disp_none')
        }
    }
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
};

const Detailslist = {
    stv: `<span>
                <input type="checkbox" name="stv232" id="stv232" disabled>
                <label for="stv232">Нестандартная створка .232</label>
                </span>`,
    fix: '<span>Фикса, просто фикса...</span>',
    svet: '<span>Только для определения размеров москитных сеток!</span>',
    toHTML(current_state) {
        const $tps_det = document.querySelector('div.tps_det');
        $tps_det.innerHTML = '';
        $tps_det.insertAdjacentHTML('afterbegin', this[current_state]);
    }
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
        check232(target.textContent);
    }

    if (target.matches('[data-side=depth] *')) {
        $StatusCheck.depth = target.textContent
    }

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
    let svCALC = new SvetCalc($StatusCheck.width || 0, $StatusCheck.height || 0);
    updateHTML($ms_simple, `<span>М/С:</span>${svCALC.toHTML('simple')}`);
    updateHTML($ms_skf, `<span>М/С SKF:</span>${svCALC.toHTML('skf')}`);
    updateHTML($out_sizes, `<span>Размеры: </span><span>${$StatusCheck.width || '---'} мм х ${$StatusCheck.height || '---'} мм</span>`);
    calcSelect($StatusCheck.tglState);
    if ($StatusCheck.tglState) outputList.setup($StatusCheck.tglState);
    // $out_sizes.innerHTML = '';
    // $out_sizes.insertAdjacentHTML('beforeend', `<span>Размеры: </span><span>${$StatusCheck.width || '---'} мм х ${$StatusCheck.height || '---'} мм</span>`)
});

$size.addEventListener('change', function(e) {

    let t = e.target;
    let msg = new SvetCalc($StatusCheck.width || 0, $StatusCheck.height || 0);
    if (!t.matches('.tps_size input')) return
    return msg
})

$tgl_btn.addEventListener('click', function(event) {
    let t = event.target;
    if (t.matches('[data-tgl-status=info]')) return
    if (t.matches('[data-tgl-status]')) {
        $StatusCheck.tglState = t.dataset.tglStatus;
        Sidelist.setup(t.dataset.tglStatus);
        Detailslist.toHTML(t.dataset.tglStatus);
        outputList.setup(t.dataset.tglStatus)
    };

})

$main.addEventListener('mousemove', function() {
    setTimeout(function() {
        document.querySelector('div.target_output > ul.target_list').innerHTML = "";
        document.querySelector('div.target_output > ul.target_list').innerHTML = setStatusInfo();
    }, 1000)
})

function setDepth(system) {
    let list = '';
    currentDepth[system].forEach(element => list += `<li>${element}</li>`);
    return list
}

function setStatusInfo(StatusObject = $StatusCheck) {
    let result = '';
    const sides = ['top', 'bot', 'left', 'right'];
    for (let key in StatusObject) {
        (sides.includes(key)) ? result += `<li>${key}: ${StatusObject[key]}(${current_delta[key]})</li>`:
            result += `<li>${key}: ${StatusObject[key]}</li>`
    }
    return result
}

function tglActive(element) {
    element.classList.toggle('active')
}

function check232(system) {
    let elem = document.getElementById('stv232');
    if (!elem) return
    elem.disabled = (system == 'ProLine' || system == 'SoftLine') ? false : true;
    if (elem.disabled) elem.checked = false;
    return
}

function updateHTML(HTMLelement, text) {
    HTMLelement.innerHTML = '';
    HTMLelement.insertAdjacentHTML('beforeend', text)
    return
}

() => console.clear();