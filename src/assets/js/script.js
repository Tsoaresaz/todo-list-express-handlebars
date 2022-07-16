const $html = document.querySelector('html');
const $checkbox = document.querySelector('input[type="checkbox"]');

console.log($checkbox);
window.onload = () => {
    const darkStorage = localStorage.getItem('darkMode');
    if (darkStorage) {
        if (darkStorage == 'true') {
            $checkbox.click();
        }
    }
}

let dark = false;
$checkbox.addEventListener('change', () => {
    console.log('Clicou dark');
    $html.classList.toggle('dark-mode');
    dark = !dark;
    localStorage.setItem('darkMode', dark.toString());
});