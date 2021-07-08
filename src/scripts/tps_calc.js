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

    get cons() {
        if (!this.w || !this.h) return
        console.count('sizes count');
        console.log({ w: this.w, h: this.h })
    }
    get clear() {
        return console.clear()
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
        if (!$StatusCheck.tglState || !$StatusCheck.tglState) return console.log('malo');;
        for (let side of $sides) {
            let temp;
            let $elem = document.querySelector($outputelem[side.dataset.side]);
            current_delta[side.dataset.side] = deltaStorage[$StatusCheck.system][$StatusCheck.tglState][this.trans_to_delta($elem.innerText)] || 0;
            this[side.dataset.side] = deltaStorage[$StatusCheck.system][$StatusCheck.tglState][this.trans_to_delta($elem.innerText)];
        }
        return console.info(current_delta)
    }
    trans_to_delta(text) {
        const trans = {
            'импост': 'di',
            'рама': 'dr',
            'порог': 'd_porog',
            'штульп': 'd_shtulp',
            ['импост в створке']: 'di_stv',
            // ['световой проем']: 'svet'
        }
        if (!trans[text]) return
        return trans[text]
    }

}


let current_delta = {
    top: '',
    bot: '',
    left: '',
    right: '',
}

function calcSelect(tglState) {
    if (!tglState) return
    const tps_status = {
        svet() { return new SvetCalc() },
        fix() {
            return new Side_delta()
        },
        stv() {
            return new Side_delta()
        },
    };
    let current = tps_status[tglState]();
    return current
}