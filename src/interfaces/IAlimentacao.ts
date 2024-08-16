import { IAnimal } from './IAnimal';

export interface IAlimentacao {
    data: Date;
    hora: string;
    animal: IAnimal;
}
