import { CasaService } from '../services/CasaService';
import { Casa } from '../models/Casa';
import { Usuario } from '../models/Usuario';
import { Animal } from '../models/Animal';

export class CasaController {
    private casaService: CasaService;

    constructor(casaService: CasaService) {
        this.casaService = casaService;
    }

    criarCasa(nome: string, senha: string): Casa {
        return this.casaService.criarCasa(nome, senha);
    }

    addUserToCasa(casa: Casa, usuario: Usuario, senha: string): void {
        this.casaService.addUserToCasa(casa, usuario, senha);
    }

    listarAnimais(casa: Casa): Animal[] {
        return this.casaService.listarAnimais(casa);
    }

    addAnimalToCasa(casa: Casa, animal: Animal): void {
        this.casaService.addAnimalToCasa(casa, animal);
    }
}
