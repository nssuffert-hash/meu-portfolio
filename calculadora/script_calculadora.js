// script-calculadora.js
document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('#display');
    const botoes = document.querySelector('.botoes');
    let valorDisplay = '0';
    let primeiroValor = null;
    let operador = null;
    let aguardandoSegundoValor = false;

    function atualizaDisplay() {
        display.textContent = valorDisplay;
    }
    atualizaDisplay();

    botoes.addEventListener('click', function(event) {
        const elementoClicado = event.target;
        const valor = elementoClicado.textContent;

        if (elementoClicado.tagName !== 'BUTTON') return;

        if (valor >= '0' && valor <= '9' || valor === '.') {
            if (aguardandoSegundoValor) {
                valorDisplay = valor;
                aguardandoSegundoValor = false;
            } else {
                valorDisplay = valorDisplay === '0' && valor !== '.' ? valor : valorDisplay + valor;
            }
        } else if (valor === 'C') {
            valorDisplay = '0';
            primeiroValor = null;
            operador = null;
        } else if (valor === '=') {
            if (operador && primeiroValor !== null) {
                const segundoValor = parseFloat(valorDisplay);
                const resultado = calcular(primeiroValor, operador, segundoValor);
                valorDisplay = String(resultado);
                primeiroValor = null;
                operador = null;
            }
        } else { // Operadores
            primeiroValor = parseFloat(valorDisplay);
            operador = valor;
            aguardandoSegundoValor = true;
        }
        atualizaDisplay();
    });

    function calcular(n1, op, n2) {
        if (op === '+') return n1 + n2;
        if (op === '-') return n1 - n2;
        if (op === '*') return n1 * n2;
        if (op === '/') return n1 / n2;
    }
});