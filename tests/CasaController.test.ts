import { CasaController } from '../src/controllers/CasaController';
import { UserController } from '../src/controllers/UserController';
import { CasaService } from '../src/services/CasaService';
import { UsuarioService } from '../src/services/UsuarioService';
import { Casa } from '../src/models/Casa';

describe('CasaController', () => {
    let casaController: CasaController;
    let userController: UserController;

    beforeEach(() => {
        const casaService = new CasaService();
        const usuarioService = new UsuarioService();

        casaController = new CasaController(casaService);
        userController = new UserController(usuarioService);
    });

    it('should create a new casa', () => {
        const newCasa = casaController.criarCasa('Casa 1', 'password123');
        expect(newCasa).toBeInstanceOf(Casa);
        expect(newCasa.nome).toBe('Casa 1');
    });

    it('should add a user to an existing casa', () => {
        const user = userController.criarUsuario('Rafael', 'password123');
        const casa = casaController.criarCasa('Casa 1', 'password123');
        casaController.addUserToCasa(casa, user, 'password123');
        expect(casa.getUsuarios()).toContain(user);
    });

    it('should not add a user with incorrect casa password', () => {
        const user = userController.criarUsuario('Rafael', 'password123');
        const casa = casaController.criarCasa('Casa 1', 'password123');
        expect(() => casaController.addUserToCasa(casa, user, 'wrongpassword')).toThrowError('Senha incorreta');
    });
});
