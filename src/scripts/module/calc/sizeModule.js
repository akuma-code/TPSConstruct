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
    updateSize() {
        const {
            w,
            h
        } = new SizeItem();
        if (this.storage.get('w') !== w) {
            this.storage.set('w', w);
            // console.log(`updated W: ${this.storage.get('w')}`)
        }
        if (this.storage.get('h') !== h) {
            this.storage.set('h', h);
            // console.log(`updated H: ${this.storage.get('h')}`);
        }

        this.storage.set('w', w);
        this.storage.set('h', h);
        // console.log(this.storage);
        return this.Obj
    };
    stored_value(key) {
        if (!!this.storage.get(key)) return this.storage.get(key)
        console.log(`${key} not found, returned nothing!`)
    };

    updateState() {
        const {
            type,
            system
        } = getState();
        this.storage.set('type', type);
        this.storage.set('system', system);
        return {
            type,
            system
        }
    };

    updateSides() {
        const sideBox = [];
        const {
            type,
            system
        } = this.updateState();

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

        if (type === 'svet') {
            return
            const MS_calced = SS(this.stored_value('w'), this.stored_value('h'));
            this.storage.set('ms_calced', MS_calced);

        }
        return this.Obj
    };


    init() {
        this.updateSize();
        this.updateState();
        this.updateSides();
        return this.Obj
    }

}

class ListenerModule extends StorageModule {
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
        return console.log(`updW: ${this.storage.get('w')}`);
    };
    updH(e) {
        let target = e.target;
        let h = target.value;
        this.storage.set('h', h)
        return console.log(`updH: ${this.storage.get('h')}`);
    };

    updState() {
        this.updateState();
        this.updateSides();
        this.updateSize();
    }

};

class CalcModule {

    RamaCalcObj(obj) {
        const {
            w,
            h,
            type,
            system,
            dwdh_rama,
        } = obj;
        const {
            dh,
            dw
        } = dwdh_rama;

        return {
            w,
            h,
            type,
            system,
            dw,
            dh,
        }
    };



    connect() {

    }

};

const LM = new ListenerModule();
const CM = new CalcModule();