import { AnimalController } from '../controllers/AnimalController';
import { CasaController } from '../controllers/CasaController';
import { AnimalService } from '../services/AnimalService';
import { CasaService } from '../services/CasaService';
import { Animal } from '../models/Animal';
import { Casa } from '../models/Casa';
import { AnimalRaca } from '../enums/AnimalRaca';
import { Database } from '../database/Database';

describe('AnimalController', () => {
    let animalController: AnimalController;
    let casaController: CasaController;
    let casaDb: Database<Casa>;
    let animalDb: Database<Animal>;

    beforeEach(() => {
        casaDb = new Database<Casa>();
        animalDb = new Database<Animal>();

        const casaService = new CasaService(casaDb);
        const animalService = new AnimalService(animalDb);

        casaController = new CasaController(casaService);
        animalController = new AnimalController(animalService);
    });

    it('should create a new animal within a casa', () => {
        const casa = new Casa('Casa 1', 'password123');
        casaDb.add(casa);

        
        const newAnimal = new Animal('Pinsher', AnimalRaca.Cachorro); 
        animalDb.add(newAnimal);

        const animais = animalDb.list().filter(a => a.nome === 'Pinsher');
        expect(animais.length).toBe(1);
        const animal = animais[0];
        expect(animal).toBeInstanceOf(Animal);
        expect(animal.nome).toBe('Pinsher');
        expect(animal.raca).toBe(AnimalRaca.Cachorro);
        
    });
});
