import { EntidadeNomeada } from "./EntidadeNomeada";
import { Usuario } from "./Usuario";
import { Animal } from "./Animal";
export class Casa extends EntidadeNomeada {
  public animais: Animal[] = [];
  public usuarios: Usuario[] = [];

  constructor(nome: string, senha: string) {
    super(nome, senha);
  }

  addAnimal(animal: Animal): void {
    this.animais.push(animal);
  }

  addUser(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }
}
