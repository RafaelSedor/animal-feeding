import { AlimentacaoService } from "../services/AlimentacaoService";
import { Alimentacao } from "../models/Alimentacao";
import { Animal } from "../models/Animal";

export class AlimentacaoController {
  private alimentacaoService: AlimentacaoService;

  constructor(alimentacaoService: AlimentacaoService) {
    this.alimentacaoService = alimentacaoService;
  }

  criarAlimentacao(animal: Animal, data: Date, hora: string): void {
    const alimentacao = new Alimentacao(animal, data, hora);
    this.alimentacaoService.criar(alimentacao);
  }

  listarAlimentacoes(animal: Animal): Alimentacao[] {
    return this.alimentacaoService.listar().filter(alimentacao => alimentacao.animal === animal);
  }
}
