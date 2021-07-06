//@ts-check
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


class TPScalc__ {
    svet(w = Number, h = Number) {
        let skf = dStorage.calculate(w, h).skf;
        let simple = dStorage.calculate(w, h).simple;
        skf.toHTML = `<span>${skf.w || '---'}мм х ${skf.h || '---'}мм</span>`;
        simple.toHTML = `<span>${simple.w || '---'}мм х ${simple.h || '---'}мм</span>`;
    }
}
/**
 * 
 */
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
    toHTML(type = '') {
        return alert(`Вывод данных не назначен!! ${type}`)
    }
};

class SvetCalc extends TPScalc {
    get out() {
        let skf = dStorage.calculate(this.w, this.h).skf;
        let simple = dStorage.calculate(this.w, this.h).simple;
        return { skf, simple }
    }


    /**
     * @param {string} type
     */
    toHTML(type) {
        return `<span>${this.out[type].w || '---'}мм х ${this.out[type].h || '---'}мм</span>`
    }
}


/**
 * @param {string } tglState
 */
function calcSelect(tglState) {
    if (!tglState) return
    const tps_status = {
        svet() { return new SvetCalc() },
        fix() { console.log('fixCalc not ready yet') },
        stv() { console.log('stvCalc not ready yet') },
    };
    let current = tps_status[tglState]();
    return current
}