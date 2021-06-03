console.log('model Loaded');

const IMG = {
    fix: {
        src: 'src/assets/rama/f.min.svg',
        width: '115px',
        height: '220px',
    },

    stv: {
        src: 'src/assets/rama/s1.min.svg',
        width: '105px',
        height: '210px',
    }

}
const Model = {
    image: {

        R: {
            src: 'src/assets/rama/f.min.svg',
            width: '115px',
            height: '220px',
        },
        Sl: {
            src: 'src/assets/rama/s1.min.svg',
        },
        Sr: {
            src: 'src/assets/rama/s3.min.svg'
        },
    }
};


function setimg(selector, img) {
    const $sel = document.querySelector(selector);
    let $el = document.createElement('img');
    $el.src = img.src;
    $el.style.height = img.height;
    $el.style.width = img.width;
    $el.classList.add('tps_img')
    $sel.insertAdjacentElement('beforeend', $el);
    return $el

}