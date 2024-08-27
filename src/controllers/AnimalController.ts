import { AnimalService } from "../services/AnimalService";
import { Casa } from "../models/Casa";
import { Animal } from "../models/Animal";
import { AnimalRaca } from "../enums/AnimalRaca";

export class AnimalController {
  private animalService: AnimalService;

  constructor(animalService: AnimalService) {
    this.animalService = animalService;
  }

  criarAnimal(nome: string, raca: AnimalRaca, casa: Casa): void {
    const animal = new Animal(nome, raca);
    casa.addAnimal(animal);
    this.animalService.criar(animal);
  }

  listarAnimais(casa: Casa): Animal[] {
    return casa.animais;
  }
}
