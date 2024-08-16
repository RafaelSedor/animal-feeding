import { UsuarioService } from '../services/UsuarioService';
import { Usuario } from '../models/Usuario';
import { Casa } from '../models/Casa';

export class UserController {
    private usuarioService: UsuarioService;

    constructor(usuarioService: UsuarioService) {
        this.usuarioService = usuarioService;
    }

    criarUsuario(nome: string, senha: string): Usuario {
        return this.usuarioService.criarUsuario(nome, senha);
    }

    logarUsuario(nome: string, senha: string): Usuario | null {
        return this.usuarioService.logarUsuario(nome, senha);
    }

    listarCasas(usuario: Usuario): Casa[] {
        return this.usuarioService.listarCasas(usuario);
    }
}
