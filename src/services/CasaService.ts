import { Casa } from '../models/Casa';
import { Usuario } from '../models/Usuario';
import { Animal } from '../models/Animal';

export class CasaService {
    private casas: Casa[] = [];

    criarCasa(nome: string, senha: string): Casa {
        const casaExistente = this.casas.find(casa => casa.nome === nome);
        if (casaExistente) {
            throw new Error('Casa já existe');
        }

        const novaCasa = new Casa(nome, senha);
        this.casas.push(novaCasa);
        return novaCasa;
    }

    addUserToCasa(casa: Casa, usuario: Usuario, senha: string): void {
        if (casa.senha !== senha) {
            throw new Error('Senha incorreta');
        }

        casa.addUsuario(usuario);
    }

    listarAnimais(casa: Casa): Animal[] {
        return casa.getAnimais();
    }

    addAnimalToCasa(casa: Casa, animal: Animal): void {
        casa.addAnimal(animal);
    }
}
