import { Operation } from "./Operation"
import { Question } from "./Question"

class Game {
    numQuestions: number
    questions: Question[]
    operators: Operation[]

    public checkAnswer(i: number, ans: number): boolean {
        console.log(`Q: ${this.questions[i].toString()} A: ${this.questions[i].answer}`)
        return this.questions[i].answer === ans
    }

    constructor(numQuestions: number, operators: Operation[]) {
        this.numQuestions = numQuestions
        this.operators = operators
        this.questions = new Array()
        for (let i = 0; i < numQuestions; i++) {
            this.questions[i] = new Question(operators)
        }
    }
}
export { Game }