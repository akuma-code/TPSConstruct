//@ts-check
// console.log(`TPS constructor Loaded`);
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
        //@ts-ignore
        return restoreValues()
    }

    clear() {
        console.log('Storage Cleared');
        localStorage.clear()
        return
    }

    updateLS() {
        return updateDB($StatusCheck)
    }

}
new TPSapp('ctrl_panel');