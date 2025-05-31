"use strict";
class Loteria {
    montarArrayNumeros(numeros_in) {
        let arr_numeros_out = [];
        for (let i = 0; i < numeros_in.length; i += 2) {
            let numero = parseInt(numeros_in.substr(i, 2), 10);
            if (!isNaN(numero)) {
                arr_numeros_out.push(numero);
            }
        }
        return arr_numeros_out;
    }
}
class Lotofacil extends Loteria {
    constructor(numerosApostados, numerosSorteados) {
        super();
        this.conferida = false;
        this.vencedora = false;
        this.aposta = {
            numsApostados: numerosApostados,
            minVence: 1,
            maxVence: 2,
            numsResultado: numerosSorteados
        };
    }
    conferir() {
        let jogados_limpos = Limpar.limpar(this.aposta.numsApostados);
        let sorteados_limpos = Limpar.limpar(this.aposta.numsResultado);
        let arr_jogados = this.montarArrayNumeros(jogados_limpos);
        let n_sorteados = this.montarArrayNumeros(sorteados_limpos);
        let acertos = n_sorteados.filter(numero => arr_jogados.includes(numero));
        this.conferida = true;
        if (acertos.length >= this.aposta.minVence && acertos.length <= this.aposta.maxVence) {
            this.vencedora = true;
        }
        return acertos.length;
    }
}
class Limpar {
    static limpar(valor) {
        return valor.replace(/\s/g, '');
    }
}
const btnValidar = document.getElementById('idValidar');
const inputJogados = document.getElementById('idSeuJogo');
const inputSorteados = document.getElementById('idJogoVencedor');
const divResultado = document.getElementById('idResultado');
btnValidar.addEventListener('click', () => {
    let jogados = inputJogados.value;
    let sorteados = inputSorteados.value;
    let app = new Lotofacil(jogados, sorteados);
    let acertos = app.conferir();
    let resultado = app.vencedora;
    divResultado.innerHTML = '<p>Você acertou ' + acertos + ' números.</p> e <p>a vitória é: ' + resultado + '</p>';
});
