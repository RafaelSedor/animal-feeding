import { AnimalController } from '../src/controllers/AnimalController';
import { CasaController } from '../src/controllers/CasaController';
import { AnimalService } from '../src/services/AnimalService';
import { CasaService } from '../src/services/CasaService';
import { Animal } from '../src/models/Animal';

describe('AnimalController', () => {
    let animalController: AnimalController;
    let casaController: CasaController;

    beforeEach(() => {
        const animalService = new AnimalService();
        const casaService = new CasaService();

        animalController = new AnimalController(animalService);
        casaController = new CasaController(casaService);
    });

    it('should create a new animal within a casa', () => {
        const casa = casaController.criarCasa('Casa 1', 'password123');
        const newAnimal = animalController.criarAnimal('Rex', 'Labrador', casa);

        expect(newAnimal).toBeInstanceOf(Animal);
        expect(newAnimal.nome).toBe('Rex');
        expect(newAnimal.raca).toBe('Labrador');
        expect(newAnimal.casa).toBe(casa);
    });
});
