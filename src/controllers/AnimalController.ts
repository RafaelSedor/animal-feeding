import { AnimalService } from '../services/AnimalService';
import { Casa } from '../models/Casa';
import { Animal } from '../models/Animal';
import { Alimentacao } from '../models/Alimentacao';

export class AnimalController {
    private animalService: AnimalService;

    constructor(animalService: AnimalService) {
        this.animalService = animalService;
    }

    criarAnimal(nome: string, raca: string, casa: Casa): Animal {
        return this.animalService.criarAnimal(nome, raca, casa);
    }

    listarAlimentacoes(animal: Animal): Alimentacao[] {
        return this.animalService.listarAlimentacoes(animal);
    }

    addAlimentacaoToAnimal(animal: Animal, alimentacao: Alimentacao): void {
        this.animalService.addAlimentacaoToAnimal(animal, alimentacao);
    }
}
