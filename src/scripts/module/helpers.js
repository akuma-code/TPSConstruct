function updateHTML(HTMLelement, text) {
    HTMLelement.innerHTML = '';
    HTMLelement.insertAdjacentHTML('beforeend', text)
    return
}