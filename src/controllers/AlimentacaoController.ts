import { AlimentacaoService } from '../services/AlimentacaoService';
import { Alimentacao } from '../models/Alimentacao';
import { Animal } from '../models/Animal';

export class AlimentacaoController {
    private alimentacaoService: AlimentacaoService;

    constructor(alimentacaoService: AlimentacaoService) {
        this.alimentacaoService = alimentacaoService;
    }

    criarAlimentacao(animal: Animal, data: Date, hora: string): Alimentacao {
        return this.alimentacaoService.criarAlimentacao(animal, data, hora);
    }

    listarAlimentacoes(animal: Animal): Alimentacao[] {
        return this.alimentacaoService.listarAlimentacoes(animal);
    }
}
