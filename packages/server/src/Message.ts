import { PlayerScore } from "./Game";

export enum MessageType {
  Question,
  Scores
}

export interface Message {
  type: MessageType;
}

export interface QuestionMessage extends Message {
  isCorrect: boolean;
  nextQuestion: string;
}

export interface ScoresMessage extends Message {
  playerScores: PlayerScore[];
}