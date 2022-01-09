import { randomInt } from "crypto";

export enum Operation {
    add,
    subtract,
    multiply,
    divide
}

export class Question {
    n1: number;
    n2: number;
    operator: Operation;
    answer: number;

    constructor(operations: Operation[]) {
        this.operator = operations[randomInt(operations.length)];
        switch (this.operator) {
            case Operation.add: {
                this.n1 = randomInt(1, 50);
                this.n2 = randomInt(1, 50);
                this.answer = this.n1 + this.n2;
                break;
            }
            case Operation.subtract: {
                this.n2 = randomInt(1, 100);
                this.n1 = randomInt(this.n2, 100);
                this.answer = this.n1 - this.n2;
                break;
            }
            case Operation.multiply: {
                this.n1 = randomInt(1, 10);
                this.n2 = randomInt(1, 10);
                this.answer = this.n1 * this.n2;
                break;
            }
            case Operation.divide: {
                this.n2 = randomInt(1, 10);
                this.answer = randomInt(1, 10);
                this.n1 = this.answer * this.n2;
                break;
            }
        }
    }

    toString(): string {
        let Opstring = this.operator === Operation.add ? '+' :
            this.operator === Operation.divide ? '/' :
                this.operator === Operation.multiply ? '*' : '-';

        return `${this.n1} ${Opstring} ${this.n2}`;
    }
}
