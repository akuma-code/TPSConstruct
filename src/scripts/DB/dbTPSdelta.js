//@ts-check

const deltaStorage = {
    Svet: {
        skf: {
            dw: (-45),
            dh: (-47)
        },
        simple: {
            dw: (24),
            dh: (45)
        },
        calc(w = Number, h = Number) {
            let result = {};
            result.skf = {
                w: +w + this.skf.dw,
                h: +h + this.skf.dh
            };
            result.simple = {
                w: +w + this.simple.dw,
                h: +h + this.simple.dh
            };
            return result
        }
    },
    ProLine: {
        fix: {
            dr: 48,
            di: 26.5
        },
        stv: {
            dr: 96,
            di: 74.5,
            d_shtulp: 64,
            di_stv: 26.5,
        },
    },

    SoftLine: {
        fix: {
            dr: 51,
            di: 26.5
        },
        stv: {
            dr: 102,
            di: 77.5,
            d_shtulp: 67,
            di_stv: 26.5,
        },
    },
    SoftLine82: {
        fix: {
            dr: 58,
            di: 32
        },
        stv: {
            dr: 104,
            di: 78,
            d_shtulp: 68,
            di_stv: 27,
        },
    },
    WHS: {
        fix: {
            dr: 44,
            di: 23.5
        },
        stv: {
            dr: 92,
            di: 71.5,
            d_shtulp: null,
            di_stv: 23.5,
        },
    },
    WHS72: {
        fix: {
            dr: 45,
            di: 24.5
        },
        stv: {
            dr: 95,
            di: 74.5,
            d_shtulp: null,
            di_stv: 24.5,
        },
    },
    Euroline: {
        fix: {
            dr: 54,
            di: 28
        },
        stv: {
            dr: 110.5,
            di: 84.5,
            d_shtulp: 72.5,
            di_stv: 28,
        },
    },

};

function get_delta(system = '') {
    return function(state = '') {
        return deltaStorage[system][state]
    }
};

let d_proline = get_delta('ProLine');

function check() {
    let state = prompt('input state', 'stv');
    let result = Object.entries(d_proline(state));
    console.log(result);
    console.dir(Object.fromEntries(result))
}

function glassSize(inp_w = 0, inp_h = 0) {
    return function(dw, dh) {
        return { W: inp_w - dw, H: inp_h - dh }
    }
};

function check2() {
    //@ts-ignore
    let w = document.querySelector('input#tps_w').value || 0;
    //@ts-ignore
    let h = document.querySelector('input#tps_h').value || 0;
    let g_stv = glassSize(w, h);
    console.log(g_stv(96, 96));
}