import { Typography } from "@mui/material"
import './Question.css'

export interface QuestionProps {
    question: string;
    answer: string;
}

export const QuestionList = (props: QuestionProps[]) => {
    return (
        <div>
            {props.map(q => <Question {...q} />)}
        </div>
    )
}

export const Question = ({question, answer}: QuestionProps) => {
    const string = question + " = " + answer;
    if (question.length > 0) {
        return (
            <Typography component="h1">
                {string}
            </Typography>
        )
    }
    else return null;
}