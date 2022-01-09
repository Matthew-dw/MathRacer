import express, { Application, Request, Response } from 'express'
import { createServer, IncomingMessage, Server } from 'http';
import { parse } from 'url';
import { WebSocket, WebSocketServer } from 'ws';
import { Game, PlayerScore } from './Game';
import { Operation } from './Question';
import { MessageType, QuestionMessage, ScoresMessage } from './Message';

const app: Application = express()
const server: Server = createServer(app)
const wss: WebSocketServer = new WebSocketServer({ server })
const port: number = 3001;
const operations: Operation[] = [Operation.add, Operation.divide, Operation.multiply, Operation.subtract];
const game: Game = new Game(10, operations);

wss.on('connection', (ws : WebSocket, req: IncomingMessage) => {
    // Initialize Player state
    const player: PlayerScore = {
        name: "test",
        score: 0
    }
    const playerIndex = game.addPlayer(player);
    let questionIndex = 0;
    ws.send(game.getQuestion(questionIndex))

    ws.on('close', () => {
        game.removePlayer(playerIndex);
    })

    ws.on('message', (message : string) => {
        const ans = Number.parseInt(message);
        const responseMessage: QuestionMessage = {
            isCorrect: game.submitAnswer(playerIndex, questionIndex++, ans),
            nextQuestion: game.getQuestion(questionIndex),
            type: MessageType.Question
        }
        ws.send(JSON.stringify(responseMessage))
    });
});

const updateClients = () => {
    const message: ScoresMessage = {
        playerScores: game.getScores(),
        type: MessageType.Scores
    }
    wss.clients.forEach((ws : WebSocket) => {
        ws.send(JSON.stringify(message));
    })
}

var interval = setInterval(updateClients, 1000);

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
server.listen(process.env.PORT || port, () => {
    console.log(`App is listening on port ${port} !`)
})