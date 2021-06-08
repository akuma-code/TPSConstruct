//@ts-check
console.log(`TPS constructor Loaded`);
/**
 * @class  базовый класс
 * @return  Базовый экземпляр
 */
class TPSRama {
    /**
     * 
     * @param {number} height высота рамы
     * @param {number} width ширина рамы
     */
    constructor(height = 0, width = 0) {
        this.height = height;
        this.width = width;
    }


}