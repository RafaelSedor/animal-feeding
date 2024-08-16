import { Casa } from './Casa';
import { Alimentacao } from './Alimentacao';

export class Animal {
    nome: string;
    raca: string;
    casa: Casa;
    private alimentacoes: Alimentacao[] = [];

    constructor(nome: string, raca: string, casa: Casa) {
        this.nome = nome;
        this.raca = raca;
        this.casa = casa;
    }

    addAlimentacao(alimentacao: Alimentacao): void {
        this.alimentacoes.push(alimentacao);
    }

    getAlimentacoes(): Alimentacao[] {
        return this.alimentacoes;
    }
}
