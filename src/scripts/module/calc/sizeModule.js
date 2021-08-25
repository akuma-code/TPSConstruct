class SizeItem {
    constructor() {
        this.w = document.querySelector('#tps_w').value || 0;
        this.h = document.querySelector('#tps_h').value || 0;
        console.count(`=> SizeItem(${this.w} x ${this.h})`)
    }
};

const DataStorage = new Map();


class StorageModule {
    constructor() {
        this.storage = DataStorage;
        // this.init()
    };

    get Obj() {
        const obj = Object.fromEntries(this.storage);
        return obj
    };
    item(key) {
        return this.storage.get(key)
    }


};

class DeltaCalcModule extends StorageModule {
    constructor() {
        super();
        this.init()
    }

    init() {
        const newsize = new SizeItem();
        const {
            w,
            h
        } = newsize;


        this.storage.set('w', w);
        this.storage.set('h', h);
        return this.Obj
    }

    updateGlass() {

        const sideBox = [];
        const {
            type,
            system
        } = getState();

        if (type === 'svet') return
        this.storage.set('type', type);
        this.storage.set('system', system);


        const $sides = document.querySelectorAll('.img_side')
        for (let $el of $sides) {
            let side = $el.dataset.side;
            let $elem = document.querySelector($outputelem[side]);
            let delta = rename($elem.innerText);
            sideBox.push({
                side: side,
                name: $elem.innerText,
                delta_id: delta,
            })
        };
        const deltabox = RamaStorage[type][system];
        let dw = 0;
        let dh = 0;

        sideBox.map(side => {
            if (side.side == 'top' || side.side == 'bot') dh += deltabox[side.delta_id]
            if (side.side == 'left' || side.side == 'right') dw += deltabox[side.delta_id]
        });

        const glass = {
            gw: this.item('w') - dw,
            gh: this.item('h') - dh
        }

        this.storage.set('glass', glass);
        return this.Obj
    };
    updateMS() {
        let MS = SS(this.storage.get('w'), this.storage.get('h'));
        this.storage.set('MS', MS);
        return this.Obj
    }
}

class ListenerModule extends DeltaCalcModule {
    constructor() {
        super();
        this.addEvLists()
    }

    addEvLists() {
        const $elements = document.querySelectorAll('[data-handler]');
        for (let el of $elements) {
            const action = el.dataset.handler;
            const actionType = el.dataset.handlerType;
            if (action && actionType) {
                el.addEventListener(actionType, this[action].bind(this), true)
            }
        }


    };

    updW(e) {
        let target = e.target;
        let w = target.value;
        this.storage.set('w', w);
        // let text = `updW: ${this.storage.get('w')}`;
        // log500(text);
        return Send2HTML(this.Obj)
    };
    updH(e) {
        let target = e.target;
        let h = target.value;
        this.storage.set('h', h)
            // log500(`updH: ${this.storage.get('h')}`);
        return Send2HTML(this.Obj)

    };

    updSides() {
        this.updateGlass();
        return Send2HTML(this.Obj)
    };

    updMSCalc() {
        this.storage.set('type', 'svet');
        this.updateMS()
            // let MS = SS(this.storage.get('w'), this.storage.get('h'));
            // this.storage.set('MS', MS);
            // debugger
        return Send2HTML(this.Obj)
    }
};

new ListenerModule();
// const SM = new StorageModule();
// const LM = new ListenerModule();
// const DCM = new DeltaCalcModule();
function Send2HTML(storageObj) {
    if (storageObj.type && storageObj.type !== 'svet') {
        const {
            gw,
            gh
        } = storageObj.glass;
        const model = RamaOutputModel;

        let htmlout = ``;
        model(storageObj.glass).map(item => {
            htmlout += item.div
        })
        return $out.innerHTML = htmlout
    };
    if (storageObj.type && storageObj.type === 'svet') {
        const {
            skf,
            simple,
            simple_whs
        } = storageObj.MS;
        const model = MSoutputModel;

        let htmlout = '';
        model(skf, simple, simple_whs).map(item => {
            htmlout += item.div
        });

        return $out.innerHTML = htmlout
    }
}

const MSoutputModel = (skf = {}, simple = {}, simple_whs = {}) => [{
        type: 'skf',
        div: `<div><span>SKF:</span>${spanResult(skf.w, skf.h)}</div>`
    },
    {
        type: 'simple',
        div: `<div><span>Простая:</span>${spanResult(simple.w, simple.h)}</div>`
    },
    {
        type: 'simple_whs',
        div: `<div><span>WHS:</span>${spanResult(simple_whs.w, simple_whs.h)}</div>`
    }
];

const RamaOutputModel = (sizes) => [{
    type: 'glass',
    div: `<div><span>Стеклопакет:</span>${spanResult(sizes.gw, sizes.gh)}</div>`
}]