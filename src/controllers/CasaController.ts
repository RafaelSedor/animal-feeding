import { CasaService } from "../services/CasaService";
import { Casa } from "../models/Casa";
import { Usuario } from "../models/Usuario";

export class CasaController {
  private casaService: CasaService;

  constructor(casaService: CasaService) {
    this.casaService = casaService;
  }

  criarCasa(nome: string, senha: string): void {
    const casa = new Casa(nome, senha);
    this.casaService.criar(casa);
  }

  listarCasas(): Casa[] {
    return this.casaService.listar();
  }

  addUserToCasa(casa: Casa, usuario: Usuario, senha: string): void {
    if (casa.senha !== senha) {
      throw new Error('Senha incorreta');
    }
    casa.usuarios.push(usuario);
  }
}
