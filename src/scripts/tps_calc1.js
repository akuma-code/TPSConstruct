// @ts-check
class MainTPSItem {

    constructor() {
        console.count('Base item created')
        this.size;
        this.state;
        this.system;
    }

    get size() {
        //@ts-ignore
        const w = +document.querySelector('input#tps_w').value;
        //@ts-ignore
        const h = +document.querySelector('input#tps_h').value;
        return {
            w,
            h
        }
    };
    /**
     * ! Определяет состояние по значению атрибута активной кнопки(.active)
     */

    get state() {
        const activeButton = document.querySelector('div.tgl_big_item.active');
        //@ts-ignore
        const state = `${activeButton.dataset.tglStatus}` || 'state undefined';
        return state

    };
    get system() {
        const sys = document.querySelector('span[output=system]');
        if (!!BigStorage[this.state][sys.textContent]) return 'NONE'
        return sys.textContent
    };
};
class LightCalc extends MainTPSItem {
    constructor() {
        super();
        console.count('LightCalc created');
        this.skf;
        this.skf
    }

    get skf() {
        if (this.system === 'WHS') return console.log('SKF unaviable at WHS!!');
        const inputsizes = this.size,
            dw = -45,
            dh = -47;
        let result = {
            W: inputsizes.w + dw,
            H: inputsizes.h + dh
        };
        return result
    };
    get simple() {
        const delta = (this.system === 'WHS') ? {
            dw: 24,
            dh: 45
        } : {
            dw: 46,
            dh: 46
        };

        const inputsizes = this.size,

            result = {
                W: inputsizes.w + delta.dw,
                H: inputsizes.h + delta.dh
            };
        return result
    }


}
class RamaCalc extends MainTPSItem {
    constructor() {
        super();
        console.count('RamaCalc created');
        this.Gsize()
    };

    get pick_delta() {
        const result = {};
        for (let direction of $sides) {
            //@ts-ignore
            let side = direction.dataset.side;
            let $elem = document.querySelector($outputelem[side]);
            let delta = rename($elem.innerText);
            let dSt = BigStorage[this.state][this.system];
            result[side] = dSt[delta];
        }
        return result
    };

    Gsize(w = this.size.w, h = this.size.h) {

        const {
            left,
            right,
            top,
            bot
        } = this.pick_delta;
        // debugger
        const dw = +left + right;
        const dh = +top + bot;
        const glass = {
            width: w - dw,
            height: h - dh
        };
        return glass

    }
}


function selectTYPE() {
    const state = function() {
        const activeButton = document.querySelector('div.tgl_big_item.active');
        const state = `${activeButton.dataset.tglStatus}` || 'state undefined';
        return state
    };
    const calculator = (state() == 'svet') ? new LightCalc() : new RamaCalc();

    // if (state() == 'svet') return new LightCalc()
    // else return new RamaCalc();

    return calculator
}