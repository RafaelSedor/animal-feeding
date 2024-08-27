import { Animal } from "../models/Animal";
import { IService } from "../interfaces/IService";
import { Database } from "../database/Database";

export class AnimalService implements IService<Animal> {
  private database: Database<Animal>;

  constructor(database: Database<Animal>) {
    this.database = database;
  }

  // Sobrescrita
  criar(animal: Animal): void {
    if (animal.raca === "Cachorro") {
      console.log("Criando um novo cachorro!");
    }
    this.database.add(animal);
  }

  listar(): Animal[] {
    return this.database.list();
  }
}
