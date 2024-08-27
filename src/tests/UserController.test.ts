import { UserController } from '../controllers/UserController';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../services/UsuarioService';
import { Database } from '../database/Database';

describe('UserController', () => {
  let userController: UserController;
  let usuarioDb: Database<Usuario>;

  beforeEach(() => {
    usuarioDb = new Database<Usuario>();
    const usuarioService = new UsuarioService(usuarioDb);
    userController = new UserController(usuarioService);
  });

  it('should create a new user', () => {
    userController.criarUsuario('Rafael', 'password123');
    const usuarios = usuarioDb.list();
    expect(usuarios.length).toBe(1);
    expect(usuarios[0].nome).toBe('Rafael');
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
    expect(user).toBeNull(); 
  });
});
