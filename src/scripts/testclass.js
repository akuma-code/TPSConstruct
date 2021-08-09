class SizeItem {
    constructor(w = Number, h = Number, options = null) {
        this.w = +w;
        this.h = +h;
        this.options = options;
        console.count(`(${w} x ${h}) => Size item #`)
    }
};

class SizeMaker {
    constructor() {
        this.makeItem
    }

    get options() {
        function getstate() {
            const activeButton = document.querySelector('div.tgl_big_box');
            //@ts-ignore
            const state = `${activeButton.dataset.tglStatus}`;
            if (state == 'undefined') alert('Invalid State!')
            return state
        };

        function getsystem() {
            const sys = document.querySelector('span[output=system]');
            if (sys == 'system') alert('System not set!')
            return sys.textContent
        };

        return {
            type: getstate(),
            system: getsystem()
        }
    };

    get makeItem() {
        //@ts-ignore
        const w = +document.querySelector('input#tps_w').value;
        //@ts-ignore
        const h = +document.querySelector('input#tps_h').value;
        const item = new SizeItem(w, h, this.options);
        console.log({ item });
        return item
    };
}

class Manipulator {
    constructor() {
        this.itemCalc = this.create()
    }
    create() {
        return new SizeMaker().makeItem
    }

    updateSize() {

        //@ts-ignore
        const w = +document.querySelector('input#tps_w').value;
        //@ts-ignore
        const h = +document.querySelector('input#tps_h').value;
        this.itemCalc.w = w;
        this.itemCalc.h = h;
        return console.table(this.itemCalc)
    };

}

class TPS_HTML_Output {
    constructor() {

    };

    model(state) {

        const outputmodel = {
            svet: [{
                    id: '#out_sizes',
                    label: 'Исходные размеры:',
                },
                {
                    id: '#ms_simple',
                    label: 'М/С:',
                },
                {
                    id: '#ms_skf',
                    label: 'М/С SKF:',
                },
            ],
            fix: [{
                    id: '#out_sizes',
                    label: 'Исходные размеры:',
                },
                {
                    id: '#out_glass',
                    label: 'Стеклопакет:',
                },
                {
                    id: '#out_stv',
                    label: 'Створка:',
                },
            ],
            stv: [{
                    id: '#out_sizes',
                    label: 'Исходные размеры:',
                },
                {
                    id: '#out_glass',
                    label: 'Стеклопакет:',
                },
                {
                    id: '#out_stv',
                    label: 'Створка:',
                },
                {
                    id: '#ms_simple',
                    label: 'М/С:',
                },
                {
                    id: '#ms_skf',
                    label: 'М/С SKF:',
                },
            ],
        };

        return outputmodel[state]
    };

    getSizes(sizeObject = {}) {
        let currentmodel = this.model(sizeObject.type);
        currentmodel.map(element => {
            if (element.id === sizeObject.id) {

                element.w = sizeObject.w;
                element.h = sizeObject.h
            }
        });
        console.table(currentmodel)
        return currentmodel
    };

    labelToHTML(HTMLObject) {
        function wraplabel(label) {
            return `<span>${label}</span>`
        };

        function wrapline(id = '', cls = '') {
            return `<div class=${cls} id=${id}>${wraplabel(label)}`
        };

        let HtmlObject = this.model
    }
}


let test_sizeobj = {
    w: 1234,
    h: 450,
    id: '#out_stv',
    type: 'stv'
}
let testhtml_stv = new TPS_HTML_Output().getSizes(test_sizeobj);