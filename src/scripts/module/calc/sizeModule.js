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
        return this.Obj
    };
    updH(e) {
        let target = e.target;
        let h = target.value;
        this.storage.set('h', h)
            // log500(`updH: ${this.storage.get('h')}`);
        return this.Obj

    };

    updSides() {

        this.updateGlass();
        return this.Obj
    };

    updMSCalc() {
        const MS = SS(this.storage.get('w'), this.storage.get('h'));
        this.storage.set('MS', MS);
        return this.Obj
    }
};

// const SM = new StorageModule();
new ListenerModule();
// const LM = new ListenerModule();
// const DCM = new DeltaCalcModule();
function Send2HTML() {
    const st = Object.fromEntries(DataStorage);
    const type = $img_cont.dataset.bgState;
    $out.innerHTML = '';
    if (type === 'svet') {
        const { skf, simple, simple_whs } = st.MS;
        const html = `<div class="outlist" id='ms_skf'><span>М/С SKF:</span><span>${skf.w}mm x ${skf.h}mm</span></div>`;
        $out.insertAdjacentHTML('beforeend', html)
    }
}


$main.addEventListener('click', function(event) {
    const target = event.target;
    console.table(Object.fromEntries(DataStorage))
    Send2HTML()
}, true);