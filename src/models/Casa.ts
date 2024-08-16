import { Usuario } from './Usuario';
import { Animal } from './Animal';

export class Casa {
    nome: string;
    senha: string;
    private usuarios: Usuario[] = [];
    private animais: Animal[] = [];

    constructor(nome: string, senha: string) {
        this.nome = nome;
        this.senha = senha;
    }

    getUsuarios(): Usuario[] {
        return this.usuarios;
    }

    addUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }

    addAnimal(animal: Animal): void {
        this.animais.push(animal);
    }

    getAnimais(): Animal[] {
        return this.animais;
    }
}
