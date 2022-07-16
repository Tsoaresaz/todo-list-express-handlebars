const $html = document.querySelector('html');
const $checkbox = document.querySelector('input[type="checkbox"]');

console.log($checkbox);
$checkbox.addEventListener('change', () => {
    $html.classList.toggle('dark-mode');
});