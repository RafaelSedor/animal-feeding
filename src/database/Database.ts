import { Usuario } from '../models/Usuario';
import { Casa } from '../models/Casa';
import { Animal } from '../models/Animal';
import { Alimentacao } from '../models/Alimentacao';

export class Database {
    usuarios: Usuario[] = [];
    casas: Casa[] = [];
    animais: Animal[] = [];
    alimentacoes: Alimentacao[] = [];
}
