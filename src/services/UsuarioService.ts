import { Usuario } from "../models/Usuario";
import { Database } from "../database/Database";

export class UsuarioService {
  private usuarioDb: Database<Usuario>;

  constructor(usuarioDb: Database<Usuario>) {
    this.usuarioDb = usuarioDb;
  }

  // Sobrecarga 
  criar(usuario: Usuario): Usuario;
  criar(nome: string, senha: string): Usuario;
  criar(nome: string): Usuario;

  criar(param1: string | Usuario, param2?: string): void | Usuario {
    if (param1 instanceof Usuario) {
      if (this.usuarioDb.list().some(u => u.nome === param1.nome)) {
        throw new Error('Usuário já existe');
      }
      this.usuarioDb.add(param1);
    } else {
      const usuario = new Usuario(param1, param2 || "defaultPassword");
      if (this.usuarioDb.list().some(u => u.nome === usuario.nome)) {
        throw new Error('Usuário já existe');
      }
      this.usuarioDb.add(usuario);
      return usuario;
    }
  }

  listar(): Usuario[] {
    return this.usuarioDb.list();
  }

  logar(nome: string, senha: string): Usuario | null {
    const usuario = this.usuarioDb.find((u) => u.nome === nome && u.senha === senha);
    return usuario || null;
  }
}
