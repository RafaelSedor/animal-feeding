import { CustomError } from './CustomError';

export class NotFoundException extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
    }
}
