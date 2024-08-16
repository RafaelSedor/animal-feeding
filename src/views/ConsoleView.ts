import * as readlineSync from "readline-sync";
import { UserController } from "../controllers/UserController";
import { CasaController } from "../controllers/CasaController";
import { AnimalController } from "../controllers/AnimalController";
import { AlimentacaoController } from "../controllers/AlimentacaoController";
import { UsuarioService } from "../services/UsuarioService";
import { CasaService } from "../services/CasaService";
import { AnimalService } from "../services/AnimalService";
import { AlimentacaoService } from "../services/AlimentacaoService";
import { Usuario } from "../models/Usuario";
import { Casa } from "../models/Casa";
import { AnimalRaca } from "../enums/AnimalRaca"; 

export class ConsoleView {
  private userController: UserController;
  private casaController: CasaController;
  private animalController: AnimalController;
  private alimentacaoController: AlimentacaoController;
  private loggedInUser: Usuario | null = null;

  constructor() {
    const usuarioService = new UsuarioService();
    const casaService = new CasaService();
    const animalService = new AnimalService();
    const alimentacaoService = new AlimentacaoService();

    this.userController = new UserController(usuarioService);
    this.casaController = new CasaController(casaService);
    this.animalController = new AnimalController(animalService);
    this.alimentacaoController = new AlimentacaoController(alimentacaoService);
  }

  mainMenu() {
    while (true) {
      console.log("1. Criar Usuário");
      console.log("2. Login");
      console.log("3. Sair");

      const choice = readlineSync.question("Escolha uma opção: ");

      switch (choice) {
        case "1":
          this.createUser();
          break;
        case "2":
          this.login();
          if (this.loggedInUser) {
            this.userMenu();
          }
          break;
        case "3":
          console.log("Saindo...");
          process.exit(0);
          break;
        default:
          console.log("Opção inválida.");
          break;
      }
    }
  }

  createUser() {
    const nome = readlineSync.question("Digite o nome de usuário: ");
    const senha = readlineSync.question("Digite a senha: ", {
      hideEchoBack: true,
    });
    try {
      this.userController.criarUsuario(nome, senha);
      console.log("Usuário criado com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Erro ao criar usuário:", error.message);
      } else {
        console.log("Erro desconhecido ao criar usuário.");
      }
    }
  }

  login() {
    const nome = readlineSync.question("Digite o nome de usuário: ");
    const senha = readlineSync.question("Digite a senha: ", {
      hideEchoBack: true,
    });
    const user = this.userController.logarUsuario(nome, senha);
    if (user) {
      console.log("Login bem-sucedido.");
      this.loggedInUser = user;
    } else {
      console.log("Nome de usuário ou senha incorretos.");
    }
  }

  userMenu() {
    while (true) {
      console.log("\n1. Criar Casa");
      console.log("2. Listar Casas");
      console.log("3. Entrar em Casa");
      console.log("4. Logout");

      const choice = readlineSync.question("Escolha uma opção: ");

      switch (choice) {
        case "1":
          this.createCasa();
          break;
        case "2":
          this.listCasas();
          break;
        case "3":
          this.enterCasa();
          break;
        case "4":
          this.loggedInUser = null;
          console.log("Logout bem-sucedido.");
          return;
        default:
          console.log("Opção inválida.");
          break;
      }
    }
  }

  createCasa() {
    const nome = readlineSync.question("Digite o nome da casa: ");
    const senha = readlineSync.question("Digite a senha da casa: ", {
      hideEchoBack: true,
    });
    try {
      this.casaController.criarCasa(nome, senha);
      console.log("Casa criada com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Erro ao criar casa:", error.message);
      } else {
        console.log("Erro desconhecido ao criar casa.");
      }
    }
  }

  listCasas() {
    if (this.loggedInUser) {
      const casas = this.userController.listarCasas(this.loggedInUser);
      console.log("\nCasas:");
      casas.forEach((casa, index) => {
        console.log(`${index + 1}. ${casa.nome}`);
      });
    } else {
      console.log("Você precisa estar logado para listar as casas.");
    }
  }

  enterCasa() {
    if (this.loggedInUser) {
      const casas = this.userController.listarCasas(this.loggedInUser);
      const casaIndex = readlineSync.questionInt("Escolha uma casa: ") - 1;

      if (casaIndex >= 0 && casaIndex < casas.length) {
        const casa = casas[casaIndex];
        const senha = readlineSync.question("Digite a senha da casa: ", {
          hideEchoBack: true,
        });

        try {
          this.casaController.addUserToCasa(casa, this.loggedInUser, senha);
          console.log("Entrou na casa com sucesso.");
          this.casaMenu(casa);
        } catch (error) {
          if (error instanceof Error) {
            console.log("Erro ao entrar na casa:", error.message);
          } else {
            console.log("Erro desconhecido ao entrar na casa.");
          }
        }
      } else {
        console.log("Casa inválida.");
      }
    } else {
      console.log("Você precisa estar logado para entrar em uma casa.");
    }
  }

  casaMenu(casa: Casa) {
    while (true) {
      console.log("\n1. Criar Animal");
      console.log("2. Listar Animais");
      console.log("3. Registrar Alimentação");
      console.log("4. Listar Alimentações");
      console.log("5. Voltar");

      const choice = readlineSync.question("Escolha uma opção: ");

      switch (choice) {
        case "1":
          this.createAnimal(casa);
          break;
        case "2":
          this.listAnimais(casa);
          break;
        case "3":
          this.registerFeeding(casa);
          break;
        case "4":
          this.listAlimentacoes(casa);
          break;
        case "5":
          return;
        default:
          console.log("Opção inválida.");
          break;
      }
    }
  }

  createAnimal(casa: Casa) {
    const nome = readlineSync.question("Digite o nome do animal: ");
    const raca = readlineSync.question("Digite a raça do animal: ");
    try {
      this.animalController.criarAnimal(nome, raca as AnimalRaca, casa); 
      console.log("Animal criado com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Erro ao criar animal:", error.message);
      } else {
        console.log("Erro desconhecido ao criar animal.");
      }
    }
  }

  listAnimais(casa: Casa) {
    const animais = this.casaController.listarAnimais(casa);
    console.log("\nAnimais:");
    animais.forEach((animal, index) => {
      console.log(`${index + 1}. ${animal.nome} - ${animal.raca}`);
    });
  }

  registerFeeding(casa: Casa) {
    const animais = this.casaController.listarAnimais(casa);
    const animalIndex = readlineSync.questionInt("Escolha um animal: ") - 1;

    if (animalIndex >= 0 && animalIndex < animais.length) {
      const animal = animais[animalIndex];
      const data = new Date();
      const hora = readlineSync.question(
        "Digite a hora da alimentação (HH:MM): "
      );

      try {
        this.alimentacaoController.criarAlimentacao(animal, data, hora);
        console.log("Alimentação registrada com sucesso.");
      } catch (error) {
        if (error instanceof Error) {
          console.log("Erro ao registrar alimentação:", error.message);
        } else {
          console.log("Erro desconhecido ao registrar alimentação.");
        }
      }
    } else {
      console.log("Animal inválido.");
    }
  }

  listAlimentacoes(casa: Casa) {
    const animais = this.casaController.listarAnimais(casa);
    animais.forEach((animal) => {
      const alimentacoes = this.animalController.listarAlimentacoes(animal);
      console.log(`\nAlimentações para ${animal.nome}:`);
      alimentacoes.forEach((alimentacao) => {
        console.log(
          `${alimentacao.data.toLocaleDateString()} - ${alimentacao.hora}`
        );
      });
    });
  }
}
