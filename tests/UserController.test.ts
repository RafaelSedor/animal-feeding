import { UserController } from '../src/controllers/UserController';
import { Usuario } from '../src/models/Usuario';
import { UsuarioService } from '../src/services/UsuarioService';

describe('UserController', () => {
    let userController: UserController;

    beforeEach(() => {
        const usuarioService = new UsuarioService();
        userController = new UserController(usuarioService);
    });

    it('should create a new user', () => {
        const newUser = userController.criarUsuario('Rafael', 'password123');
        expect(newUser).toBeInstanceOf(Usuario);
        expect(newUser.nome).toBe('Rafael');
    });

    it('should not allow creation of user with duplicate name', () => {
        userController.criarUsuario('Rafael', 'password123');
        expect(() => userController.criarUsuario('Rafael', 'password456')).toThrowError('Usuário já existe');
    });

    it('should log in a user with correct credentials', () => {
        userController.criarUsuario('Rafael', 'password123');
        const user = userController.logarUsuario('Rafael', 'password123');
        expect(user).toBeDefined();
        expect(user?.nome).toBe('Rafael');
    });

    it('should not log in a user with incorrect credentials', () => {
        userController.criarUsuario('Rafael', 'password123');
        const user = userController.logarUsuario('Rafael', 'wrongpassword');
        expect(user).toBeFalsy();
    });
});
