import * as readlineSync from "readline-sync";
import { UserController } from "../controllers/UserController";
import { CasaController } from "../controllers/CasaController";
import { AnimalController } from "../controllers/AnimalController";
import { AlimentacaoController } from "../controllers/AlimentacaoController";
import { Usuario } from "../models/Usuario";
import { Casa } from "../models/Casa";
import { AnimalRaca } from "../enums/AnimalRaca";
import { Animal } from "../models/Animal";
import { UsuarioService } from "../services/UsuarioService";
import { CasaService } from "../services/CasaService";
import { AnimalService } from "../services/AnimalService";
import { AlimentacaoService } from "../services/AlimentacaoService";
import { Database } from "../database/Database";
import { Alimentacao } from "../models/Alimentacao";

export class ConsoleView {
  private userController: UserController;
  private casaController: CasaController;
  private animalController: AnimalController;
  private alimentacaoController: AlimentacaoController;
  private loggedInUser: Usuario | null = null;
  private selectedCasa: Casa | null = null;
  private selectedAnimal: Animal | null = null;

  constructor() {

    const usuarioDb = new Database<Usuario>();
    const casaDb = new Database<Casa>();
    const animalDb = new Database<Animal>();
    const alimentacaoDb = new Database<Alimentacao>();

    const usuarioService = new UsuarioService(usuarioDb);
    const casaService = new CasaService(casaDb);
    const animalService = new AnimalService(animalDb);
    const alimentacaoService = new AlimentacaoService(alimentacaoDb);

    this.userController = new UserController(usuarioService);
    this.casaController = new CasaController(casaService);
    this.animalController = new AnimalController(animalService);
    this.alimentacaoController = new AlimentacaoController(alimentacaoService);
  }

  mainMenu() {
    while (true) {
      console.log("1. Criar Usuário");
      console.log("2. Logar Usuário");
      console.log("3. Sair");

      const option = readlineSync.question("Escolha uma opção: ");

      switch (option) {
        case "1":
          this.createUser();
          break;
        case "2":
          this.loginUser();
          if (this.loggedInUser) {
            this.userMenu();
          }
          break;
        case "3":
          console.log("Saindo...");
          process.exit(0);
        default:
          console.log("Opção inválida!");
      }
    }
  }

  userMenu() {
    while (true) {
      console.log("\n1. Selecionar Casa");
      console.log("2. Criar Casa");
      console.log("3. Adicionar Usuário à Casa");
      console.log("4. Listar Casas");
      console.log("5. Sair");

      const option = readlineSync.question("Escolha uma opção: ");

      switch (option) {
        case "1":
          this.selectCasa();
          if (this.selectedCasa) {
            this.casaMenu(this.selectedCasa);
          }
          break;
        case "2":
          this.createCasa();
          break;
        case "3":
          this.addUserToCasa();
          break;
        case "4":
          this.listCasas();
          break;
        case "5":
          console.log("Voltando ao menu principal...");
          return;
        default:
          console.log("Opção inválida!");
      }
    }
  }

  selectCasa() {
    const casas = this.casaController.listarCasas();
    if (casas.length === 0) {
      console.log("Nenhuma casa encontrada.");
      return;
    }

    console.log("Escolha uma casa para gerenciar:");
    casas.forEach((casa, index) => {
      console.log(`${index + 1}. ${casa.nome}`);
    });

    const option = readlineSync.question("Escolha uma casa: ");
    const casaIndex = parseInt(option, 10) - 1;

    if (casaIndex >= 0 && casaIndex < casas.length) {
      this.selectedCasa = casas[casaIndex];
      console.log(`Casa selecionada: ${this.selectedCasa.nome}`);
    } else {
      console.log("Opção inválida!");
    }
  }

  casaMenu(casa: Casa) {
    while (true) {
      console.log("\n1. Criar Animal");
      console.log("2. Listar Animais da Casa");
      console.log("3. Gerenciar Alimentações");
      console.log("4. Sair");

      const option = readlineSync.question("Escolha uma opção: ");

      switch (option) {
        case "1":
          this.createAnimal(casa);
          break;
        case "2":
          this.listAnimais(casa);
          break;
        case "3":
          this.animalMenu(casa);
          break;
        case "4":
          console.log("Voltando ao menu de usuário...");
          return;
        default:
          console.log("Opção inválida!");
      }
    }
  }

  animalMenu(casa: Casa) {
    while (true) {
      console.log("\n1. Selecionar Animal");
      console.log("2. Criar Alimentação");
      console.log("3. Listar Alimentações");
      console.log("4. Voltar");

      const option = readlineSync.question("Escolha uma opção: ");

      switch (option) {
        case "1":
          this.selectAnimal(casa);
          break;
        case "2":
          if (this.selectedAnimal) {
            this.createAlimentacao(casa, this.selectedAnimal);
          } else {
            console.log("Nenhum animal selecionado.");
          }
          break;
        case "3":
          if (this.selectedAnimal) {
            this.listAlimentacoes(this.selectedAnimal);
          } else {
            console.log("Nenhum animal selecionado.");
          }
          break;
        case "4":
          console.log("Voltando ao menu da casa...");
          return;
        default:
          console.log("Opção inválida!");
      }
    }
  }

  selectAnimal(casa: Casa) {
    const animais = this.animalController.listarAnimais(casa);
    if (animais.length === 0) {
      console.log("Nenhum animal encontrado.");
      return;
    }

    console.log("Escolha um animal:");
    animais.forEach((animal, index) => {
      console.log(`${index + 1}. ${animal.nome}`);
    });

    const option = readlineSync.question("Escolha um animal: ");
    const animalIndex = parseInt(option, 10) - 1;

    if (animalIndex >= 0 && animalIndex < animais.length) {
      this.selectedAnimal = animais[animalIndex];
      console.log(`Animal selecionado: ${this.selectedAnimal.nome}`);
    } else {
      console.log("Opção inválida!");
    }
  }

  createUser() {
    const nome = readlineSync.question("Nome do usuário: ");
    const senha = readlineSync.question("Senha do usuário (ou deixe em branco para senha padrão): ", { hideEchoBack: true });

    if (senha) {
      this.userController.criarUsuario(nome, senha);
    } else {
      this.userController.criarUsuario(nome, "defaultPassword");
    }
    
    console.log("Usuário criado com sucesso!");
  }

  loginUser() {
    const nome = readlineSync.question("Nome do usuário: ");
    const senha = readlineSync.question("Senha do usuário: ", { hideEchoBack: true });
    this.loggedInUser = this.userController.logarUsuario(nome, senha);
    if (this.loggedInUser) {
      console.log(`Login bem-sucedido! Bem-vindo, ${this.loggedInUser.toString()}`);
    } else {
      console.log("Falha no login. Verifique suas credenciais.");
    }
  }


  createCasa() {
    if (!this.loggedInUser) {
      console.log("Você precisa estar logado para criar uma casa.");
      return;
    }
    const nome = readlineSync.question("Nome da casa: ");
    const senha = readlineSync.question("Senha da casa: ", { hideEchoBack: true });
    this.casaController.criarCasa(nome, senha);
    console.log("Casa criada com sucesso!");
  }

  addUserToCasa() {
    if (!this.loggedInUser) {
      console.log("Você precisa estar logado para adicionar um usuário à casa.");
      return;
    }
    const casaNome = readlineSync.question("Nome da casa: ");
    const casa = this.casaController.listarCasas().find((c) => c.nome === casaNome);
    if (!casa) {
      console.log("Casa não encontrada.");
      return;
    }
    const nome = readlineSync.question("Nome do usuário a ser adicionado: ");
    const senha = readlineSync.question("Senha da casa: ", { hideEchoBack: true });
    const usuario = this.userController.listarUsuarios().find((u) => u.nome === nome);
    if (usuario) {
      try {
        this.casaController.addUserToCasa(casa, usuario, senha);
        console.log("Usuário adicionado à casa com sucesso!");
      } catch (error) {
        if (error instanceof Error) {
          console.log("Erro ao executar a operação:", error.message);
        } else {
          console.log("Erro desconhecido:", error);
        }
      }
    } else {
      console.log("Usuário não encontrado.");
    }
  }

  createAnimal(casa: Casa) {
    const nome = readlineSync.question("Nome do animal: ");
    const raca = readlineSync.question("Raça do animal (Cachorro/Gato/Pássaro): ") as AnimalRaca;
    this.animalController.criarAnimal(nome, raca, casa);
    console.log("Animal criado com sucesso!");
  }

  createAlimentacao(casa: Casa, animal: Animal) {
    const data = new Date(readlineSync.question("Data (YYYY-MM-DD): "));
    const hora = readlineSync.question("Hora (HH:MM): ");
    this.alimentacaoController.criarAlimentacao(animal, data, hora);
    console.log("Alimentação registrada com sucesso!");
  }

  listCasas() {
    const casas = this.casaController.listarCasas();
    if (casas.length === 0) {
      console.log("Nenhuma casa encontrada.");
    } else {
      casas.forEach((casa) =>
        console.log(`Casa: ${casa.nome}, Usuários: ${casa.usuarios.length}, Animais: ${casa.animais.length}`)
      );
    }
  }

  listAnimais(casa: Casa) {
    const animais = this.animalController.listarAnimais(casa);
    if (animais.length === 0) {
      console.log("Nenhum animal encontrado.");
    } else {
      animais.forEach((animal) =>
        console.log(`Animal: ${animal.nome}, Raça: ${animal.raca}`)
      );
    }
  }

  listAlimentacoes(animal: Animal) {
    const alimentacoes = this.alimentacaoController.listarAlimentacoes(animal);
    if (alimentacoes.length === 0) {
      console.log("Nenhuma alimentação encontrada.");
    } else {
      alimentacoes.forEach((alimentacao) =>
        console.log(`Data: ${alimentacao.data.toISOString().split('T')[0]}, Hora: ${alimentacao.hora}`)
      );
    }
  }
}
