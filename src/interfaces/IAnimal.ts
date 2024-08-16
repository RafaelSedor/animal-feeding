import { ICasa } from './ICasa';
import { AnimalRaca } from '../enums/AnimalRaca';

export interface IAnimal {
    nome: string;
    raca: AnimalRaca;
    casa: ICasa;
}
