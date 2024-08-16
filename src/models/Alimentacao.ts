import { Animal } from './Animal';

export class Alimentacao {
    data: Date;
    hora: string;
    animal: Animal;

    constructor(data: Date, hora: string, animal: Animal) {
        this.data = data;
        this.hora = hora;
        this.animal = animal;
    }
}
