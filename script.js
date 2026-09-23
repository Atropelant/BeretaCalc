class Calculadora {
    #numero1;
    #numero2;

    constructor(numero1, numero2) {
        this.#numero1 = numero1;
        this.#numero2 = numero2;
    }

    somar() {
        return this.#numero1 + this.#numero2;
    }

    subtrair() {
        return this.#numero1 - this.#numero2;
    }

    multiplicar() {
        return this.#numero1 * this.#numero2;
    }

    dividir() {
        if (this.#numero2 === 0) {
            throw new Error("Não é possível dividir por zero.");
        }

        return this.#numero1 / this.#numero2;
    }
}


class CalcularUi {
    #visor;
    #btnSoma;
    #btnSub;
    #btnDiv;
    #btnMult;
    #btnEnviar;
    #btnLimpar;
    #divResult;
    #operacao;
    #numero1;
    #numero2;

    constructor() {
        this.#visor = document.getElementById("visor");

        this.#btnSoma = document.getElementById("soma");
        this.#btnSub = document.getElementById("subtracao");
        this.#btnDiv = document.getElementById("divisao");
        this.#btnMult = document.getElementById("multiplicacao");

        this.#btnEnviar = document.getElementById("enviar");
        this.#btnLimpar = document.getElementById("limpar");
        this.#divResult = document.getElementById("result");

        this.#operacao = null;
        this.#numero1 = "";
        this.#numero2 = "";

        this.#configurarEventos();
    }

    #configurarEventos() {
        document.querySelectorAll(".operadores input").forEach((botao) => {
            botao.addEventListener("click", () => {
                this.#clicarBotao(botao.value);
            });
        });

        document.addEventListener("keydown", (evento) => {
            const tecla = evento.key;

            if (!isNaN(tecla) || ["+", "-", "/", "*"].includes(tecla)) {
                this.#clicarBotao(tecla);
            }

            if (tecla === "Enter" || tecla === "=") {
                this.#clicarBotao("=");
            }

            if (tecla === "Escape") {
                this.#clicarBotao("C");
            }
        });
    }

    #clicarBotao(valor) {
        if (!isNaN(valor)) {
            this.#adicionarNumero(valor);
            return;
        }

        if (valor === "C") {
            this.#limpar();
            return;
        }

        if (valor === "=") {
            this.#calcular();
            return;
        }

        this.#operacao = valor;
        this.#numero1 = this.#visor.textContent;
        this.#visor.textContent = "0";
    }

    #adicionarNumero(numero) {
        if (this.#visor.textContent === "0") {
            this.#visor.textContent = numero;
        } else {
            this.#visor.textContent += numero;
        }
    }

    #calcular() {
        try {
            this.#numero2 = this.#visor.textContent;

            if (this.#numero1 === "" || this.#numero2 === "0") {
                throw new Error("Digite os números corretamente.");
            }

            const numero1 = parseFloat(this.#numero1);
            const numero2 = parseFloat(this.#numero2);

            const calculadora = new Calculadora(numero1, numero2);

            let resultado;

            switch (this.#operacao) {
                case "+":
                    resultado = calculadora.somar();
                    break;

                case "-":
                    resultado = calculadora.subtrair();
                    break;

                case "/":
                    resultado = calculadora.dividir();
                    break;

                case "*":
                    resultado = calculadora.multiplicar();
                    break;

                default:
                    throw new Error("Escolha uma operação.");
            }

            this.#visor.textContent = resultado;
            this.#divResult.textContent = `${resultado}`;

        } catch (erro) {
            this.#divResult.textContent = erro.message;
        }
    }

    #limpar() {
        this.#visor.textContent = "0";
        this.#numero1 = "";
        this.#numero2 = "";
        this.#operacao = null;
        this.#divResult.textContent = "Resultado aqui";
    }
}


window.addEventListener("DOMContentLoaded", () => {
    new CalcularUi();
});