import React, { useState } from 'react';
import './App.css';
import { Button, Container, Paper, TextField } from '@mui/material';


var ws : WebSocket = new WebSocket("ws://localhost:3001/")
function App() {
  const [messages, setMessages] = useState([""]);
  const [answer, setAnswer] = useState("")
  
  ws.onmessage = (event : MessageEvent) => {
    switch (event.data) {
      case "True": {
        break;
      }
      case "False": {
        break;
      }
      case "Game Over": {
        break;
      }
      default: {
        break;
      }
    }
    setMessages(messages.concat(event.data))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }

  const submitAnswer = () => {
    ws.send(answer)
    setAnswer("")
  }
  return (
    <Container maxWidth="sm">
      <Paper >
        <TextField value={answer} onChange={handleChange} />
        <Button variant="contained" onClick={submitAnswer}>Submit Answer</Button>
        { messages.map(m => <div> {m} </div>) }
      </Paper>
    </Container>
  );
}

export default App;
