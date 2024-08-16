import { AlimentacaoController } from '../src/controllers/AlimentacaoController';
import { AnimalController } from '../src/controllers/AnimalController';
import { CasaController } from '../src/controllers/CasaController';
import { AlimentacaoService } from '../src/services/AlimentacaoService';
import { AnimalService } from '../src/services/AnimalService';
import { CasaService } from '../src/services/CasaService';
import { Alimentacao } from '../src/models/Alimentacao';

describe('AlimentacaoController', () => {
    let alimentacaoController: AlimentacaoController;
    let animalController: AnimalController;
    let casaController: CasaController;

    beforeEach(() => {
        const casaService = new CasaService();
        const animalService = new AnimalService();
        const alimentacaoService = new AlimentacaoService();

        casaController = new CasaController(casaService);
        animalController = new AnimalController(animalService);
        alimentacaoController = new AlimentacaoController(alimentacaoService);
    });

    it('should create a new alimentacao record for an animal', () => {
        const casa = casaController.criarCasa('Casa 1', 'password123');
        const animal = animalController.criarAnimal('Rex', 'Labrador', casa);
        const newAlimentacao = alimentacaoController.criarAlimentacao(animal, new Date(), '08:00');

        expect(newAlimentacao).toBeInstanceOf(Alimentacao);
        expect(newAlimentacao.animal).toBe(animal);
        expect(newAlimentacao.data).toBeInstanceOf(Date);
        expect(newAlimentacao.hora).toBe('08:00');
    });
});
