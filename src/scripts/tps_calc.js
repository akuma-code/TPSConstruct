const dStorage = {
    skf: {
        dw: (-45),
        dh: (-47)
    },
    simple: {
        dw: (24),
        dh: (45)
    },
    calculate(w = Number, h = Number) {
        let result = {};
        result.skf = {
            w: +w + this.skf.dw,
            h: +h + this.skf.dh
        };
        result.simple = {
            w: +w + this.simple.dw,
            h: +h + this.simple.dh
        };
        return result
    }
}



class TPScalc {
    constructor(w = $StatusCheck.width || 0, h = $StatusCheck.height || 0) {
        this.w = w;
        this.h = h;
        // this.cons
    }
    toHTML() {
        return alert('Вывод данных не назначен!!')
    }
};

class SvetCalc extends TPScalc {
    get out() {
        let skf = dStorage.calculate(this.w, this.h).skf;
        let simple = dStorage.calculate(this.w, this.h).simple;
        return { skf, simple }
    }


    toHTML(type) {
        return `<span>${this.out[type].w || '---'}мм х ${this.out[type].h || '---'}мм</span>`
    }
}

class Side_delta {
    constructor() {
        this.top;
        this.bot;
        this.left;
        this.right;
        this.getvals
    }
    get getvals() {
        // if (!$StatusCheck.system || !$StatusCheck.tglState) return console.log(`system not set`);
        for (let side of $sides) {
            let s = side.dataset.side;
            let $elem = document.querySelector($outputelem[s]);
            let delta = rename($elem.innerText);
            let dSt = deltaStorage[localStorage.getItem('system')][localStorage.getItem('tglState')];
            current_delta[s] = dSt[delta] || 0;
            this[s] = dSt[delta] || 0;
        }
        // return console.log({ current_delta })
    }

}


let current_delta = {
    top: 0,
    bot: 0,
    left: 0,
    right: 0,
    // get dwdh() {
    //     return {
    //         dw: this.left + this.right,
    //         dh: this.top + this.bot
    //     }
    // }
}

function rename(text) {
    const dictionary = {
        'импост': 'di',
        'рама': 'dr',
        'порог': 'd_porog',
        'штульп': 'd_shtulp',
        ['импост в створке']: 'di_stv',
        ['световой проем']: 'svet'
    }
    if (!dictionary[text]) return
    return dictionary[text]
};


/**
 * ! Основной класс калькулятора.... либо класс для получения дельт из BigStorage, еще не понятно
 */
class TPScalculator {
    constructor() {
        this.devInfo
    }

    get size() {
        const w = +document.querySelector('#tps_w').value;
        const h = +document.querySelector('#tps_h').value;
        return {
            w,
            h
        }
    };

    get state() {
        const currentElement = document.querySelector('.tgl_big_item.active');
        const currentState = currentElement.dataset.tglStatus || 'state undefined';
        return currentState
    };

    get devInfo() {
        console.log(this.size);
        console.log(this.system);
        console.log(this.delta);
        return this
    };

    get system() {
        const sys = document.querySelector('span[output=system]')
        return sys.textContent
    };

    get delta() {
        const currentDelta = (this.state === 'svet') ? BigStorage[this.state] : BigStorage[this.state][this.system]
        return currentDelta
    }
}