import express, { Application, Request, Response } from 'express'
import { createServer, Server } from 'http';
import { parse } from 'url';

import { WebSocket, WebSocketServer } from 'ws';
import { Game } from './Game';
import { Operation } from './Operation';
import { User } from './User';

const app: Application = express()
const server: Server = createServer(app)
const wss: WebSocketServer = new WebSocketServer({ server })
const port: number = 3001

const players: User[] = [];
const operations: Operation[] = [Operation.add, Operation.divide, Operation.multiply, Operation.subtract]
const game: Game = new Game(10, operations)



wss.on('connection', (ws : WebSocket) => {
    let i = 0
    players.push(new User("test"));
    ws.send(game.questions[i].toString())
    ws.on('message', (message : string) => {
        console.log('received: %s', message);
        if (i >= 9) ws.send("Game Over") 
        else {
            ws.send(game.checkAnswer(i++, Number.parseInt(message)) ? "Correct" : "False") 
            ws.send(game.questions[i].toString())
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
server.listen(process.env.PORT || port, () => {
    console.log(`App is listening on port ${port} !`)
})