function toggleFix(elem) {
    if (elem.dataset.tglStatus === 'fix') return elem.dataset.tglStatus = 'stv'
    else return elem.dataset.tglStatus = 'fix'
}

const tglbtn = document.querySelector('.tgl_thumb');
tglbtn.addEventListener('click', function(event) {
    const $box = document.querySelector('.tgl_box');
    // const $stv = document.querySelector('.tgl_box');

    if (event.target.dataset.tglStatus === 'fix') {
        $box.classList.remove('stv_bg');
        $box.classList.add('fix_bg');
    } else {
        $box.classList.remove('fix_bg');
        $box.classList.add('stv_bg');

    }
})