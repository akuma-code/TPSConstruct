const StatusBox = function() {
    function getstate() {
        const activeButton = document.querySelector('div.tgl_big_box');
        //@ts-ignore
        const { state } = activeButton.dataset.tglStatus;
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


class SizeItem {
    constructor(w = Number, h = Number, options = null) {
        this.w = +w;
        this.h = +h;
        this.options = options;
        console.count(`(${w} x ${h}) => SizeItem:`)
    }
};




class SizeMaker {
    constructor() {
            this.options = StatusBox();
            this.makeSizeItem;
        }
        // 
        //     get options() {
        //         function getstate() {
        // 
        //             const activeButton = document.querySelector('div.tgl_big_box');
        //             //@ts-ignore
        //             const state = `${activeButton.dataset.tglStatus}`;
        //             if (state == 'undefined') alert('Invalid State!')
        //             return state
        //         };
        // 
        //         function getsystem() {
        //             const sys = document.querySelector('span[output=system]');
        //             if (sys == 'system') alert('System not set!')
        //             return sys.textContent
        //         };
        // 
        //         return {
        //             type: getstate(),
        //             system: getsystem()
        //         }
        //     };


    get makeSizeItem() {
        //@ts-ignore
        const w = +document.querySelector('input#tps_w').value;
        //@ts-ignore
        const h = +document.querySelector('input#tps_h').value;
        const item = new SizeItem(w, h, this.options);
        // console.log({ item });
        return item
    };
}

class Manipulator {
    constructor() {
        this.itemCalc = {};
    }
    create() {
        this.itemCalc = new SizeMaker()
        return this.itemCalc
    }

    updateSize() {
        //@ts-ignore
        const w = +document.querySelector('input#tps_w').value;
        //@ts-ignore
        const h = +document.querySelector('input#tps_h').value;
        this.itemCalc.w = w;
        this.itemCalc.h = h;
        return console.log(this.itemCalc)
    };

}
let op = new Manipulator();
// op.create()

// TODO: функция расчета стекла, обработчик на изменения значений


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

    getModel() {

        const $el = document.querySelector('[data-html-type]');
        const type = $el.dataset.htmlType;
        const result = this.templateOutput[type];
        return result
    };



    getHTMLObject() {
        let Text2Html = [];
        let MODEL = this.getModel();
        // console.dir({ model: MODEL });
        MODEL.forEach(element => {
            Text2Html.push(`<div data-output=${element.html_out}><span>${element.label}</span></div>`)
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
    const buttons = document.getElementsByClassName('ts');
    for (button of buttons) {

        button.addEventListener('click', function(event) {
            let t = event.target;

            let type = t.dataset.type_sel;
            // const { state } = document.querySelector('[data-html-type]');
            // state.dataset.htmlType = type;
            let HTML_OUT = new TPS_HTML_Output()
            renderHTML(HTML_OUT.getHTMLObject())

            return
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