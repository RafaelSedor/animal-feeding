import { Animal } from '../models/Animal';
import { Casa } from '../models/Casa';
import { Alimentacao } from '../models/Alimentacao';

export class AnimalService {
    criarAnimal(nome: string, raca: string, casa: Casa): Animal {
        const novoAnimal = new Animal(nome, raca, casa);
        casa.addAnimal(novoAnimal);
        return novoAnimal;
    }

    listarAlimentacoes(animal: Animal): Alimentacao[] {
        return animal.getAlimentacoes();
    }

    addAlimentacaoToAnimal(animal: Animal, alimentacao: Alimentacao): void {
        animal.addAlimentacao(alimentacao);
    }
}
