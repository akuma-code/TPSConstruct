class SaveModule {
    constructor() {
        this.data = {};
        this.savedItems = [];
        this.counter = 0;
    }

    save() {
        ++this.counter
        const saveObj = Object.fromEntries(DataStorage);
        const {
            MS,
            stv_ms,
            glass,
            w,
            h,
            system,
            type
        } = saveObj;
        this.data = {
            glass
        };
        this.data.size = {
            w,
            h
        };
        this.data.state = {
            system,
            type,
            background: document.documentElement.style.getPropertyValue('--bg-image'),
        };
        this.data.stv_ms = stv_ms;
        this.data.MS = MS;

        this.savedItems.push({
            calc: this.counter,
            glass: this.data.glass || null,
            state: this.data.state,
            size: this.data.size,
            ms_stv: this.data.stv_ms || null,
            ms_svet: this.data.MS || null,
        })
        return this.info
    }

    get info() {
        this.savedItems.forEach(item => console.log(item))
        return
    }
};

const sm = new SaveModule();