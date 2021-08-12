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

const BigStorage = {
    dwdh_s: function(ms_type = '') {
        return this.svet.filter(item => item.ms_type === ms_type)
    },
    svet: [{
            ms_type: 'skf',
            dw: (-45),
            dh: (-47)
        },
        {
            ms_type: 'simple',
            dw: (24),
            dh: (45)
        },
        {
            ms_type: 'whs',
            dw: (46),
            dh: (46)
        }
    ],

    stv: {
        ProLine: {
            rama: 64,
            impost: 42.5,
            dr: 96,
            di: 74.5,
            d_shtulp: 64,
            di_stv: 26.5,
        },

        SoftLine: {
            rama: 67,
            impost: 42.5,
            dr: 102,
            di: 77.5,
            d_shtulp: 67,
            di_stv: 26.5,
        },

        SoftLine82: {
            rama: 73,
            impost: 47,
            dr: 104,
            di: 78,
            d_shtulp: 68,
            di_stv: 27,
        },

        WHS: {
            rama: 58,
            impost: 37.5,
            dr: 92,
            di: 71.5,
            d_shtulp: null,
            di_stv: 23.5,
        },

        WHS72: {
            rama: 61,
            impost: 42.5,
            dr: 95,
            di: 74.5,
            d_shtulp: null,
            di_stv: 24.5,
        },

        EuroLine: {
            rama: 67,
            impost: 41,
            dr: 110.5,
            di: 84.5,
            d_shtulp: 72.5,
            di_stv: 28,
        },
    },

    fix: {
        ProLine: {
            dr: 48,
            di: 26.5
        },

        SoftLine: {
            dr: 51,
            di: 26.5

        },
        SoftLine82: {
            dr: 58,
            di: 32

        },
        WHS: {
            dr: 44,
            di: 23.5

        },
        WHS72: {
            dr: 45,
            di: 24.5

        },
        EuroLine: {
            dr: 54,
            di: 28
        },
    }
};