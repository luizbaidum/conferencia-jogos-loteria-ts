interface Aposta {
    numsApostados: string
    minVence: number
    maxVence: number
    numsResultado: string
}

abstract class Loteria {

    protected montarArrayNumeros(numeros_in: string): number[] {
        let arr_numeros_out: number[] = []

        for (let i = 0; i < numeros_in.length; i += 2) {
            let numero: number = parseInt(numeros_in.substr(i, 2), 10)
            if (!isNaN(numero)) {
                arr_numeros_out.push(numero)
            }
        }

        return arr_numeros_out
    }
}

class Lotofacil extends Loteria {

    private aposta: Aposta
    public conferida: boolean = false
    public vencedora: boolean = false

    constructor(numerosApostados: string, numerosSorteados: string) {
        super ()
        this.aposta = {
            numsApostados: numerosApostados,
            minVence: 1,
            maxVence: 2,
            numsResultado: numerosSorteados
        }
    }

    public conferir(): number {
        let jogados_limpos: string = Limpar.limpar(this.aposta.numsApostados)
        let sorteados_limpos: string = Limpar.limpar(this.aposta.numsResultado)
        let arr_jogados: number[] = this.montarArrayNumeros(jogados_limpos)
        let n_sorteados: number[] = this.montarArrayNumeros(sorteados_limpos)
        let acertos: number[] = n_sorteados.filter(numero => 
            arr_jogados.includes(numero)
        );

        this.conferida = true

        if (acertos.length >= this.aposta.minVence && acertos.length <= this.aposta.maxVence) {
            this.vencedora = true
        }

        return acertos.length
    }
}

class Limpar {
    public static limpar(valor: string): string {
        return valor.replace(/\s/g, '')
    }
}

const btnValidar = <HTMLButtonElement> document.getElementById('idValidar')
const inputJogados = <HTMLInputElement> document.getElementById('idSeuJogo')
const inputSorteados = <HTMLInputElement> document.getElementById('idJogoVencedor')
const divResultado = <HTMLDivElement> document.getElementById('idResultado')

btnValidar.addEventListener('click', () => {
    let jogados: string = inputJogados.value
    let sorteados: string = inputSorteados.value

    let app: Lotofacil = new Lotofacil(jogados, sorteados)
    let acertos: number = app.conferir()
    let resultado: boolean = app.vencedora

    divResultado.innerHTML = '<p>Você acertou ' + acertos + ' números.</p> e <p>a vitória é: ' + resultado + '</p>'
})