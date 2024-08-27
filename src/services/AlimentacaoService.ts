import { Alimentacao } from "../models/Alimentacao";
import { IService } from "../interfaces/IService";
import { Database } from "../database/Database";

export class AlimentacaoService implements IService<Alimentacao> {
  private database: Database<Alimentacao>;

  constructor(database: Database<Alimentacao>) {
    this.database = database;
  }

  criar(alimentacao: Alimentacao): void {
    this.database.add(alimentacao);
  }

  listar(): Alimentacao[] {
    return this.database.list();
  }
}
