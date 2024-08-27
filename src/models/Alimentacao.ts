import { Animal } from "./Animal";

export class Alimentacao {
  constructor(public animal: Animal, public data: Date, public hora: string) {}
}
