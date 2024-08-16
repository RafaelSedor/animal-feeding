import { Alimentacao } from '../models/Alimentacao';
import { Animal } from '../models/Animal';

export class AlimentacaoService {
    criarAlimentacao(animal: Animal, data: Date, hora: string): Alimentacao {
        const novaAlimentacao = new Alimentacao(data, hora, animal);
        animal.addAlimentacao(novaAlimentacao);
        return novaAlimentacao;
    }

    listarAlimentacoes(animal: Animal): Alimentacao[] {
        return animal.getAlimentacoes();
    }
}
