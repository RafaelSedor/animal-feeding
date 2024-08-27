import { UsuarioService } from "../services/UsuarioService";
import { Usuario } from "../models/Usuario";

export class UserController {
  private usuarioService: UsuarioService;

  constructor(usuarioService: UsuarioService) {
    this.usuarioService = usuarioService;
  }

  criarUsuario(nome: string, senha: string): Usuario {
    const usuario = this.usuarioService.criar(nome, senha);
    return usuario;
  }

  logarUsuario(nome: string, senha: string): Usuario | null {
    return this.usuarioService.logar(nome, senha);
  }

  listarUsuarios(): Usuario[] {
    return this.usuarioService.listar();
  }
}
