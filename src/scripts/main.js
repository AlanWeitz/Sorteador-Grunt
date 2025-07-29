
document.getElementById('form-sorteador').addEventListener('submit', function(event) {
    event.preventDefault();
    const max = parseInt(document.getElementById('numero-maximo').value, 10);
    if (isNaN(max) || max < 2) {
        alert('Informe um número válido maior ou igual a 2');
        return;
    }
    const sorteado = Math.floor(Math.random() * max) + 1;
    const resultadoSpan = document.getElementById('resultado-valor');
    resultadoSpan.textContent = sorteado;
    document.querySelector('.resultado').style.display = 'block';
});
