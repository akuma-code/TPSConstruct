class SizeItem {
    constructor() {
        this.w = document.querySelector('#tps_w').value || 0;
        this.h = document.querySelector('#tps_h').value || 0;
        console.count(`(${this.w} x ${this.h}) => SizeItem`)
    }
};

const getState = function() {
    function state() {
        //@ts-ignore
        const state = $stateElem.dataset.bgState
        if (state === 'undefined') alert('Invalid State!')
        return state
    };

    function system() {
        const sys = document.querySelector('span[output=system]');
        if (sys == 'system') alert('System not set!')
        return sys.textContent
    };

    return {
        type: state(),
        system: system()
    }
};

function rename(text) {
    const dictionary = {
        'импост': 'di',
        'рама': 'dr',
        'порог': 'd_porog',
        'штульп': 'd_shtulp',
        ['импост в створке']: 'di_stv',
        ['свет']: 'svet'
    }
    if (!dictionary[text]) return
    return dictionary[text]
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
            console.log(`updated W: ${this.storage.get('w')}`)
        }
        if (this.storage.get('h') !== h) {
            this.storage.set('h', h);
            console.log(`updated H: ${this.storage.get('h')}`);
        }

        this.storage.set('w', w);
        this.storage.set('h', h);
        // console.log(this.storage);
        return this.Obj
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
            const MS_dwdh = SS(0, 0);
            this.storage.set('dwdh_ms', MS_dwdh);

        }
        return this.Obj
    };


    init() {
        this.updateSize();
        this.updateState();
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
    }

};

const LM = new ListenerModule();
// const sb = new StorageModule();