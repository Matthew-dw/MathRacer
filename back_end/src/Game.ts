import { Operation, Question } from "./Question"

export type PlayerScore = {
    name: string,
    score: number
}

enum GameState {
    Pregame,
    Inprogress,
    Postgame,
}

export class Game {
    private numQuestions: number;
    private operators: Operation[];
    private questions: Question[] = new Array();
    private playerScores: PlayerScore[] = new Array();
    private state: GameState = GameState.Pregame;

    public constructor(numQuestions: number, operators: Operation[]) {
        this.numQuestions = numQuestions;
        this.operators = operators;
        for (let i = 0; i < numQuestions; i++) {
            this.questions[i] = new Question(operators);
        }
    }

    public getQuestion(questionIndex: number): string {
        return this.questions[questionIndex].toString();
    }

    public getScores(): PlayerScore[] {
        return this.playerScores;
    }

    public submitAnswer(playerIndex: number, questionIndex: number, ans: number): boolean {
        console.log(this.playerScores, playerIndex);

        if (this.questions[questionIndex].answer === ans) {
            this.playerScores[playerIndex].score++;
            return true;
        }
        return false;
    }

    public addPlayer(player: PlayerScore): number {
        this.playerScores.push(player);
        return this.playerScores.length - 1;
    }

    public removePlayer(index: number): void {
        this.playerScores.splice(index);
    }
}