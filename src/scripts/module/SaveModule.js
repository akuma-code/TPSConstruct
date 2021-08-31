class SaveModule {
    constructor() {
        this.data = {}
    }

    save(dataMap) {
        const saveObj = Object.fromEntries(dataMap);
        const {
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
            type
        };
        this.data.img = document.documentElement.style.getPropertyValue('--bg-image');
        return console.table(this.data)
    }

    get info() {
        return console.table(this.data)
    }
};

const sm = new SaveModule();