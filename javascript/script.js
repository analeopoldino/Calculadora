// Aqui são declaradas as constantes e variáveis para os elementos do DOM
let elementoResultado = document.querySelector(".js-resultado");
let botoesPadroes = document.querySelectorAll(".js-btn-padroes");
let botaoResultado = document.querySelector(".js-btn-igual");
let botaoAC = document.querySelector(".js-btn-ac");
let botaMaisMenos = document.querySelector(".js-btn-mais-menos");
let botaoDelete = document.querySelector(".js-btn-del");
let currentOperationText = document.querySelector("#current-operation");

// Aqui está a classe da calculadora
class Calculator {
    constructor() {
        this.currentOperation = "";
    }

    addDigit(digit) {
        if (digit === "." && this.currentOperation.includes(".")) {
            return;
        }

        const isOperator = ["+", "-", "*", "/"].includes(digit);

        if (isOperator && this.currentOperation.length > 1 && isNaN(this.currentOperation[this.currentOperation.length - 2])) {
            this.currentOperation = this.currentOperation.slice(0, -2) + ` ${digit} `;
        } else {
            this.currentOperation += digit;
        }

        this.updateScreen();
    }

    updateScreen() {
        currentOperationText.innerText = this.currentOperation;
    }

    processEqualOperator() {
        let operation = this.currentOperation;
        let result = eval(operation);
        this.currentOperation = result.toString();
        this.updateScreen();
    }

    processClearOperator() {
        this.currentOperation = "";
        this.updateScreen();
    }

    processDelOperator() {
        this.currentOperation = this.currentOperation.slice(0, -1);
        this.updateScreen();
    }
}

// Instância da calculadora
const calculadora = new Calculator();

function adicionarElementoAoInputResultado(numeroDigitado) {
    verificarSimboloDuplicado(numeroDigitado);

    const isOperator = ["+", "-", "*", "/"].includes(numeroDigitado);
    if (isOperator) {
        elementoResultado.value = " ";
    } else if (verificarSimboloInicial(numeroDigitado)) {
        return;
    }

    if (!isOperator) {
        if (elementoResultado.value === "0") {
            elementoResultado.value = numeroDigitado;
        } else {
            elementoResultado.value += numeroDigitado;
        }
    }
    calculadora.addDigit(numeroDigitado);
}

function executarCalculo() {
    try {
        calculadora.processEqualOperator();
        elementoResultado.value = calculadora.currentOperation;
    } catch {
        alert("Algo deu errado. Tente novamente");
    }
}

function limparResultado() {
    elementoResultado.value = "0";
    calculadora.processClearOperator();
}

function trocarSinalDaConta() {
    if (Number(elementoResultado.value)) {
        elementoResultado.value = elementoResultado * -1;
    }
}

function deletarUltimaValorDoResultado() {
    elementoResultado.value = elementoResultado.value.slice(0, -1);
    calculadora.processDelOperator();
}

function verificarSimboloDuplicado(numeroDigitadoRecebidoPorParametro) {
  const isOperator = ["+", "-", "*", "/"].includes(numeroDigitadoRecebidoPorParametro);

  if (isOperator) {
    const ultimoCaractere = elementoResultado.value.slice(-1);

    if (["+", "-", "*", "/"].includes(ultimoCaractere)) {
      // Se o último caractere no input é um operador,
      // substitua o último pelo novo
      elementoResultado.value = elementoResultado.value.slice(0, -1) + numeroDigitadoRecebidoPorParametro;
      return;
    }
  }
}

function verificarSimboloInicial(numeroDigitadoRecebidoPorParametro) {
    return elementoResultado.value.length == 0 && !Number(numeroDigitadoRecebidoPorParametro);
}

function gerenciarEscutadores() {
    botoesPadroes.forEach((elementoCorrente) => {
        elementoCorrente.addEventListener("click", () => {
            let valorDoElementoClicado = elementoCorrente.dataset.valor;
            adicionarElementoAoInputResultado(valorDoElementoClicado)
        });
    });

    botaoResultado.addEventListener('click', executarCalculo);
    botaoAC.addEventListener('click', limparResultado);
    botaMaisMenos.addEventListener('click', trocarSinalDaConta);
    botaoDelete.addEventListener('click', deletarUltimaValorDoResultado);
}

gerenciarEscutadores();
