function toggleFix(elem) {
    if (elem.dataset.tglStatus === 'fix') return elem.dataset.tglStatus = 'stv'
    else return elem.dataset.tglStatus = 'fix'
}

const tglbtn = document.querySelector('.tgl_thumb');
tglbtn.addEventListener('click', function(event) {
    const $fix = document.querySelector('.tgl_box::before');
    const $stv = document.querySelector('.tgl_box::after');

    if (event.target.dataset.tglStatus === 'fix') {
        $fix.classList.add('s_bg');
        $stv.classList.remove('h_bg');
    } else {
        $stv.classList.add('s_bg');
        $fix.classList.remove('h_bg');

    }
})