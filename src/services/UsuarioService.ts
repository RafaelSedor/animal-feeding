import { Usuario } from '../models/Usuario';
import { Casa } from '../models/Casa';

export class UsuarioService {
    private usuarios: Usuario[] = [];

    criarUsuario(nome: string, senha: string): Usuario {
        const usuarioExistente = this.usuarios.find(user => user.nome === nome);
        if (usuarioExistente) {
            throw new Error('Usuário já existe');
        }

        const novoUsuario = new Usuario(nome, senha);
        this.usuarios.push(novoUsuario);
        return novoUsuario;
    }

    logarUsuario(nome: string, senha: string): Usuario | null {
        const usuario = this.usuarios.find(user => user.nome === nome && user.senha === senha);
        return usuario || null;
    }

    listarCasas(usuario: Usuario): Casa[] {
        return usuario.getCasas();
    }

    addCasaToUsuario(usuario: Usuario, casa: Casa) {
        usuario.addCasa(casa);
    }
}
