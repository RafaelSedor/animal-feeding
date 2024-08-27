import { Casa } from "../models/Casa";
import { IService } from "../interfaces/IService";
import { Usuario } from "../models/Usuario";
import { Database } from "../database/Database";

export class CasaService implements IService<Casa> {
  private database: Database<Casa>;

  constructor(database: Database<Casa>) {
    this.database = database;
  }

  criar(casa: Casa): void {
    this.database.add(casa);
  }

  listar(): Casa[] {
    return this.database.list();
  }

  addUserToCasa(casa: Casa, usuario: Usuario, senha: string): void {
    if (casa.senha === senha) {
      casa.addUser(usuario);
    } else {
      throw new Error("Senha incorreta.");
    }
  }
}
