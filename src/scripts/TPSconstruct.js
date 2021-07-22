//@ts-check
console.log(`TPS constructor Loaded`);
class TPSapp {
    constructor(elem) {
        // this._elem = elem;
        document.getElementById(elem).onclick = this.onClick.bind(this)
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    }

    restore() {
        return restoreValues()
    }

    clear() {
        return console.clear()
    }

    restoreStv() {
        const stv = document.querySelector('[data-tgl-status=stv]');
        //@ts-ignore
        stv.click();
        let store = document.querySelectorAll('[data-stdb]');
        for (let key in store) {
            if (!!localStorage.getItem(key)) store[key].innerHTML = localStorage.getItem(key)
        }
    }
}

new TPSapp('ctrl_panel');