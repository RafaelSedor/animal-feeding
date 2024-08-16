import { Casa } from './Casa';

export class Usuario {
    nome: string;
    senha: string;
    private casas: Casa[] = [];

    constructor(nome: string, senha: string) {
        this.nome = nome;
        this.senha = senha;
    }

    addCasa(casa: Casa): void {
        this.casas.push(casa);
    }

    getCasas(): Casa[] {
        return this.casas;
    }
}
