import React, { useState } from 'react';
import { Question } from './components/Question';
import './App.css';
import { Container } from '@mui/material';
import { Message, MessageType, QuestionMessage } from 'mathracer-shared';

const ws : WebSocket = new WebSocket("ws://localhost:3001/")
const App = () => {
  const [answer, setAnswer] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [correctCounter, setCorrectCounter] = useState<number>(0);
  const [incorrectCounter, setIncorrectCounter] = useState<number>(0);

  const onKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key >= '0' && ev.key <= '9') {
      setAnswer(answer + ev.key);
    } 
    else if (ev.key === "Backspace") {
      setAnswer(answer.slice(0, -1));
    }
    else if (ev.key === "Enter") {
      ws.send(answer);
      setAnswer("");
    } 
  }

  ws.onmessage = (event : MessageEvent) => {
    const message: Message = JSON.parse(event.data);
    if (message.type === MessageType.Question) {
      let qm: QuestionMessage = event.data;
      if (qm.isCorrect) {
        setCorrectCounter(correctCounter + 1);
      } else {
        setIncorrectCounter(incorrectCounter + 1);
      }

      setQuestion(qm.nextQuestion);
    } else {

    }
  }

  return (
    <div className="page" onKeyDown={onKeyDown} tabIndex={0}>
      <Container maxWidth="sm" >
        <Question question={question} answer={answer} />
        <div> Correct: {correctCounter} </div>
        <div> Incorrect: {incorrectCounter} </div>
      </Container>
    </div>
  );
}

export default App;
