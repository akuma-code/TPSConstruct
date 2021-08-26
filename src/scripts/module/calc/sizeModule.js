class SizeItem {
    constructor() {
        this.w = document.querySelector('#tps_w').value || 0;
        this.h = document.querySelector('#tps_h').value || 0;
    }

};

const DataStorage = DS = new Map();
const Map2Obj = (obj) => Object.fromEntries(obj);
const DSO = Object.fromEntries;


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
        const {
            w,
            h
        } = new SizeItem();


        this.storage.set('w', w)
            .set('h', h);
        return this.Obj
    }

    updateGlass() {

        const sideBox = [];
        const {
            type,
            system
        } = getState();
        const {
            w,
            h
        } = new SizeItem();
        this.storage.set('type', type);
        this.storage.set('system', system);

        if (type === 'svet') return this.Obj

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
            gw: Math.floor(w - dw),
            gh: Math.floor(h - dh)
        }

        this.storage.set('glass', glass);
        return this.Obj
    };
    updateStvMs() {
        const stv_ms = MS_STV(this.Obj);
        this.storage.set('stv_ms', stv_ms);
        return this.Obj
    }

    updateMS() {
        getState();
        const {
            w,
            h
        } = new SizeItem();
        const MS = SS(w, h);
        // let MS = SS(this.storage.get('w'), this.storage.get('h'));
        this.storage.set('MS', MS);
        return this.Obj
    }
}

class ListenerModule extends DeltaCalcModule {
    constructor() {
        super();
        this.add()
    }

    add() {
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
        Send2HTML(this.Obj)
        return
    };
    updH(e) {
        let target = e.target;
        let h = target.value;
        this.storage.set('h', h)
        return Send2HTML(this.Obj)

    };

    updSizes() {
        getState();
        const { w, h } = new SizeItem();
        this.storage.set('w', w)
            .set('h', h);
        $StatusCheck.width = w;
        $StatusCheck.height = h;
        // document.getElementById('ta').innerHTML = `W:${w} x H:${h}`;
        Send2HTML(this.Obj)
            // return Send2HTML(this.Obj)
    };

    updSides() {
        this.updateGlass();
        this.updateStvMs();
        return Send2HTML(this.Obj)
    };

    updMSCalc() {
        this.storage.set('type', 'svet');
        this.updateMS()
        return Send2HTML(this.Obj)
    }
};

new ListenerModule();

function Send2HTML(storageObj = DSO(DataStorage)) {
    let htmlout = ``;
    if (storageObj.type && storageObj.type !== 'svet') {
        $out.innerHTML = '';
        const {
            system,
            type
        } = storageObj;
        const model = RamaOutputModel;

        model(storageObj).map(item => {
            const fixIgnore = ['skf', 'simple']
            if (type === 'fix' && fixIgnore.includes(item.type)) item.div = '';
            if (system === 'WHS' && item.type === 'skf') item.div = '';
            // htmlout += item.div
            $out.insertAdjacentHTML("beforeend", item.div)
        });
    };
    if (storageObj.type && storageObj.type === 'svet') {
        $out.innerHTML = '';
        const {
            skf,
            simple,
            simple_whs
        } = storageObj.MS;
        const model = MSoutputModel;

        // let htmlout = '';
        model(skf, simple, simple_whs).forEach(item => {
            // htmlout += item.div
            $out.insertAdjacentHTML("beforeend", item.div)
        });

    }

    // return $out.insertAdjacentHTML("beforeend", htmlout)
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
    div: `<div><span>Стеклопакет:</span>${spanResult(sizes.glass.gw, sizes.glass.gh)}</div>`
}, {
    type: 'shtap',
    div: `<div><span>Штапик:</span>${spanResult(sizes.glass.gw+10, sizes.glass.gh+10)}</div>`
}, {
    type: 'simple',
    div: `<div><span>М/С:</span>${spanResult(sizes.stv_ms.simple.w, sizes.stv_ms.simple.h)}</div>`
}, {
    type: 'skf',
    div: `<div><span>SKF:</span>${spanResult(sizes.stv_ms.skf.w, sizes.stv_ms.skf.h)}</div>`
}, ]