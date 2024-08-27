import { EntidadeNomeada } from "./EntidadeNomeada";
export class Usuario extends EntidadeNomeada {
  constructor(nome: string, senha: string) {
    super(nome, senha);
  }

  toString(): string {
    return `Usuario: ${this.nome}`;
  }
}
