const delta_ms = {
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


class TPScalc__ {
    svet(w = Number, h = Number) {
        let skf = delta_ms.calculate(w, h).skf;
        let {
            simple
        } = delta_ms.calculate(w, h).simple;
        skf.toHTML = `<span>${skf.w || '---'}мм х ${skf.h || '---'}мм</span>`;
        simple.toHTML = `<span>${simple.w || '---'}мм х ${simple.h || '---'}мм</span>`;
    }
}

class TPScalc {
    constructor(w, h) {
        this.w = w;
        this.h = h;
    }

    toHTML() {
        return alert('Вывод данных не назначен!!')
    }
};

class SvetCalc extends TPScalc {
    skf(w = this.w, h = this.h) {
        return delta_ms.calculate(w, h).skf
    }
    simple(w = this.w, h = this.h) {
        return delta_ms.calculate(w, h).simple
    }

    toHTML(type) {
        if (type == 'skf') return `<span>${this.skf(this.w,this.h).w || '---'}мм х ${this.skf().h || '---'}мм</span>`
    }
}

let svCALC = new SvetCalc;