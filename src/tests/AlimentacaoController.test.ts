import { AlimentacaoController } from "../controllers/AlimentacaoController";
import { AnimalController } from "../controllers/AnimalController";
import { CasaController } from "../controllers/CasaController";
import { AlimentacaoService } from "../services/AlimentacaoService";
import { AnimalService } from "../services/AnimalService";
import { CasaService } from "../services/CasaService";
import { Alimentacao } from "../models/Alimentacao";
import { Casa } from "../models/Casa";
import { Animal } from "../models/Animal";
import { Database } from "../database/Database";
import { AnimalRaca } from "../enums/AnimalRaca";

describe("AlimentacaoController", () => {
  let alimentacaoController: AlimentacaoController;
  let animalController: AnimalController;
  let casaController: CasaController;
  let casaDb: Database<Casa>;
  let animalDb: Database<Animal>;
  let alimentacaoDb: Database<Alimentacao>;

  beforeEach(() => {
    casaDb = new Database<Casa>();
    animalDb = new Database<Animal>();
    alimentacaoDb = new Database<Alimentacao>();

    const casaService = new CasaService(casaDb);
    const animalService = new AnimalService(animalDb);
    const alimentacaoService = new AlimentacaoService(alimentacaoDb);

    casaController = new CasaController(casaService);
    animalController = new AnimalController(animalService);
    alimentacaoController = new AlimentacaoController(alimentacaoService);
  });

  test('should create a new alimentacao record for an animal', () => {
    const casa = new Casa('Casa 1', 'password123');
    casaDb.add(casa);

    const animal = new Animal('Pinsher', AnimalRaca.Cachorro);
    animalDb.add(animal);

    const data = new Date();
    const hora = '08:00';
    
    alimentacaoController.criarAlimentacao(animal, data, hora);

    const alimentacoes = alimentacaoDb.list();
    const createdAlimentacao = alimentacoes.find(a => a.animal.nome === animal.nome);

    expect(createdAlimentacao).toBeDefined();
    expect(createdAlimentacao!.animal).toEqual(animal); 
    expect(createdAlimentacao!.data).toEqual(data);
    expect(createdAlimentacao!.hora).toBe(hora);
  });
});
