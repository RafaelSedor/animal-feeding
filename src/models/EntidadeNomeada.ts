export class EntidadeNomeada {
  constructor(public nome: string, public senha: string) {}

  toString(): string {
    return `Nome: ${this.nome}`;
  }
}
