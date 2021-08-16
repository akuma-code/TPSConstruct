const img_sides = ['top', 'bot', 'left', 'right'];

const Sidelist = {
    svet: {
        top: ['свет'],
        bot: ['свет'],
        left: ['свет'],
        right: ['свет'],
    },

    fix: {
        top: ['рама', 'импост'],
        bot: ['рама', 'импост'],
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

        for (let side of img_sides) {
            let list = '';
            let $selector = document.querySelector(`ul.drop_content[data-side=${side}]`);
            this[tglStatus][side].forEach(element => list += `<li data-handler-type='click' data-handler='updState'>${element}</li>`);
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

//! ОБЩИЙ ОБРАБОТЧИК (onClick Listener)
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
        is232(target.textContent);
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
        // !updateOutput();

    }
}, true);


//!INPUT LISTENER
$size.addEventListener('input', function(e) {
    let t = e.target;
    if (!t.matches('.tps_size input')) return console.log('target error!');
    if (t.matches('#tps_w')) $StatusCheck.width = t.value;
    if (t.matches('#tps_h')) $StatusCheck.height = t.value;
    const {
        width,
        height
    } = $StatusCheck
}, true);
$tgl_btn.addEventListener('click', function(event) {
    let t = event.target;
    const $big_box = document.querySelector('div.tgl_big_box');
    if (t.matches('[data-tgl-status=info]')) return
    if (t.matches('[data-tgl-status]')) {
        const state = t.dataset.tglStatus;
        $StatusCheck.tglState = state;
        $big_box.dataset.tglStatus = state;
        // $big_box.dataset.htmlType = state;
        Sidelist.setup(state);
        Detailslist.toHTML(state);
        selectBGimg(state);
        checkSideState(t);

    };

}, true)
window.addEventListener('beforeunload', () => updateDB($StatusCheck));

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

function is232(system) {
    let elem = document.getElementById('stv232');
    if (!elem) return
    elem.disabled = (system == 'ProLine' || system == 'SoftLine') ? false : true;
    if (elem.disabled) elem.checked = false;
    return
}

function updateDB(storage = {}) {
    for (let key in storage) {
        if (localStorage.getItem(key) === storage[key]) continue
        localStorage.setItem(key, storage[key]);
        $StatusCheck[key] = localStorage.getItem(key);
        console.count(`added ${key} : ${storage[key]}`)
    }
    return
}

function selectBGimg(state) {
    $img_cont.dataset.bgState = state;
    $StatusCheck.bgState = state;
    const src = {
        stv: "url('../assets/rama/stv.svg')",
        fix: "url('../assets/rama/fix.svg')",
        svet: "url('../assets/rama/svet.svg')",
    }

    let root = document.documentElement.style;
    return root.setProperty(`--bg-image`, src[state])
}
/**
 * меняет сторону окна или рамы при смене типа расчета - створка/фикса/свет
 * @param {string} target event.target
 * @returns Если совпадает, то ничего, если не совпадает, то заменяет на первое значение из списка
 */
function checkSideState(target) {
    const currentState = target.dataset.tglStatus || 'unset';
    if (currentState === 'unset') return console.log('state unset');
    for (let side of $sides) {
        let direction = side.dataset.side;
        let elem = document.querySelector(`span[output=${direction}`)
        if (!Sidelist[currentState][direction].includes(elem.textContent)) elem.textContent = Sidelist[currentState][direction][0]
    }
}