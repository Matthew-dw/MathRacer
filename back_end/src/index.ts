import express, { Application, Request, Response } from 'express'
import { createServer, Server } from 'http';

import { WebSocket, WebSocketServer } from 'ws';

const app: Application = express()
const server: Server = createServer(app)
const wss: WebSocketServer = new WebSocketServer({ server })
const port: number = 3001
  
wss.on('connection', (ws : WebSocket) => {
    ws.on('message', (message : string) => {
      console.log('received: %s', message);
    });
    
    ws.send('testing');
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
server.listen(process.env.PORT || port, () => {
    console.log(`App is listening on port ${port} !`)
})