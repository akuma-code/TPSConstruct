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

const modelOutput = {
    svet: [{
            id: '#out_sizes',
            label: 'Исходные размеры:',
            html_out: 'html_sizes',
        },
        {
            id: '#ms_simple',
            label: 'М/С:',
            html_out: 'html_simple',
        },
        {
            id: '#ms_skf',
            label: 'М/С SKF:',
            html_out: 'html_skf',
        },
    ],
    fix: [{
            id: '#out_sizes',
            label: 'Исходные размеры:',
            html_out: 'html_sizes',
        },
        {
            id: '#out_glass',
            label: 'Стеклопакет:',
            html_out: 'html_glass',
        },
        {
            id: '#out_stv',
            label: 'Створка:',
            html_out: 'html_stv',
        },
    ],
    stv: [{
            id: '#out_sizes',
            label: 'Исходные размеры:',
            html_out: 'html_sizes',
        },
        {
            id: '#out_glass',
            label: 'Стеклопакет:',
            html_out: 'html_glass',
        },
        {
            id: '#out_stv',
            label: 'Створка:',
            html_out: 'html_stv',
        },
        {
            id: '#ms_simple',
            label: 'М/С:',
            html_out: 'html_simple',
        },
        {
            id: '#ms_skf',
            label: 'М/С SKF:',
            html_out: 'html_skf',
        },
    ],
};

class TPS_HTML_Output {
    constructor() {
        this.templateOutput = modelOutput
    }

    getModel(type) {
        const result = modelOutput[type]
        return result
    };

    getSizes(sizeObject) {
        currentmodel.map(element => {
            if (element.id === sizeObject.id) {

                element.w = sizeObject.w;
                element.h = sizeObject.h
            }
        });
        console.table(currentmodel)
        return currentmodel
    };

    getHTMLObject(type) {
        let Text2Html = [];
        let MODEL = this.getModel(type);
        console.dir({ model: MODEL });
        MODEL.forEach(element => {
            Text2Html.push(`<div data-output=${element.html_out}>${element.label}</div>`)
        });
        // console.table(resultHTML);
        return Text2Html
    };

};

function renderHTML(HtmlTextObjects = []) {
    const output = document.querySelector('[data-output=html_out]');
    output.innerHTML = ''
    HtmlTextObjects.forEach(TextElement => {
        output.insertAdjacentHTML('beforeend', TextElement)
    })
}

function TPS_addHandler() {
    const $tgl_box = document.querySelector('div.tgl_big_box');
    const buttons = document.getElementsByClassName('ts');
    for (button of buttons) {

        button.addEventListener('click', function(event) {
            let t = event.target;
            let type = t.dataset.type_sel;
            const state = document.querySelector('[data-html-type]');
            state.dataset.htmlType = type;
            let HTML_OUT = new TPS_HTML_Output()
            renderHTML(HTML_OUT.getHTMLObject(type))

            return console.log(HTML_OUT)
        })

    }

}

TPS_addHandler();

let test_sizeobj = {
    w: 1234,
    h: 450,
    id: '#out_stv',
    type: 'stv'
}