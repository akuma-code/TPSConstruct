class SizeItem {
    constructor() {
        this.w = document.querySelector('#tps_w').value || 0;
        this.h = document.querySelector('#tps_h').value || 0;
        console.count(`=> SizeItem(${this.w} x ${this.h})`)
    }
};




class StorageModule {
    constructor() {
        this.storage = new Map();
        this.init()
    };

    get Obj() {
        const obj = Object.fromEntries(this.storage);
        return obj
    };

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
};

class DeltaCalcModule extends StorageModule {

    // updateState() {
    //     const {
    //         type,
    //         system
    //     } = getState();
    //     this.storage.set('type', type);
    //     this.storage.set('system', system);
    //     return {
    //         type,
    //         system
    //     }
    // };

    updateSides() {
        const sideBox = [];
        const {
            type,
            system
            // } = this.updateState();
        } = getState();
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

        this.storage.set('ramaSideBox', sideBox)

        if (type !== 'svet') {
            const deltabox = RamaStorage[type][system];
            let dw = 0;
            let dh = 0;

            sideBox.map(side => {
                if (side.side == 'top' || side.side == 'bot') dh += deltabox[side.delta_id]
                if (side.side == 'left' || side.side == 'right') dw += deltabox[side.delta_id]
            });

            const dwdh = {
                dw,
                dh
            }

            this.storage.set('dwdh_rama', dwdh);
        };

        return this.Obj
    };

}

class ListenerModule extends DeltaCalcModule {
    constructor() {
        super();
        this.addInputs()
    }

    addInputs() {
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
        this.storage.set('w', w)
        let text = `updW: ${this.storage.get('w')}`;
        log500(text);
        t1000(text)
    };
    updH(e) {
        let target = e.target;
        let h = target.value;
        this.storage.set('h', h)
        log500(`updH: ${this.storage.get('h')}`);
    };

    updSides() {
        return this.updateSides();
        // this.updateState();
        // this.updateSize();
    };

    updMSCalc() {

        const MS_calced = SS(this.storage.get('w'), this.storage.get('h'));
        this.storage.set('MS_calced', MS_calced);
        // return this.Obj

    }
};





// const SM = new StorageModule;
const LM = new ListenerModule();
// const DCM = new DeltaCalcModule();