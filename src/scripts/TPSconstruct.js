//@ts-check
console.log(`TPS constructor Loaded`);
/**
 * @class  базовый класс
 * @return {Object} Базовый экземпляр
 */
class TPSRama {
    /**
     * 
     * @param {string} prof выбранный профиль
     * @param {number} height высота рамы
     * @param {number} width ширина рамы
     */
    constructor(prof = '', height = 0, width = 0) {
        this.p = prof;
        this.h = height;
        this.w = width;
    }


}

class TPSconstructor extends TPSRama {
    constructor() {
        super()
    }
}