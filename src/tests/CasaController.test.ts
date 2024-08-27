import { CasaController } from '../controllers/CasaController';
import { UserController } from '../controllers/UserController';
import { CasaService } from '../services/CasaService';
import { UsuarioService } from '../services/UsuarioService';
import { Casa } from '../models/Casa';
import { Usuario } from '../models/Usuario';
import { Database } from '../database/Database';

describe('CasaController', () => {
    let casaController: CasaController;
    let userController: UserController;
    let casaDb: Database<Casa>;
    let usuarioDb: Database<Usuario>;

    beforeEach(() => {
        casaDb = new Database<Casa>();
        usuarioDb = new Database<Usuario>();

        const casaService = new CasaService(casaDb);
        const usuarioService = new UsuarioService(usuarioDb);

        casaController = new CasaController(casaService);
        userController = new UserController(usuarioService);
    });

    it('should create a new casa', () => {
        casaController.criarCasa('Casa 1', 'password123');
        const casas = casaController.listarCasas();
        expect(casas.length).toBe(1);
        expect(casas[0].nome).toBe('Casa 1');
    });

    it('should add a user to an existing casa', () => {
        const user = userController.criarUsuario('Rafael', 'password123');
        casaController.criarCasa('Casa 1', 'password123');
        const casas = casaController.listarCasas();
        const casa = casas[0];
        casaController.addUserToCasa(casa, user, 'password123');
        expect(casa.usuarios).toContain(user);
    });

    it('should not add a user with incorrect casa password', () => {
        const user = userController.criarUsuario('Rafael', 'password123');
        casaController.criarCasa('Casa 1', 'password123');
        const casas = casaController.listarCasas();
        const casa = casas[0];
        expect(() => casaController.addUserToCasa(casa, user, 'wrongpassword')).toThrowError('Senha incorreta');
    });
});
