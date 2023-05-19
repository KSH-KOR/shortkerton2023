import React, { useEffect, useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { AddNewAnswer, AddNewAnswerAsNotUser, AddNewQuestion } from '../services/DbService';

const AnswerQuestionForm = ({ user, questionData }) => {
    const [answer, setAnswer] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        console.log("questionData: " + questionData);
    }, []);

    const handleClick = async () => {
        if (!questionData) {
            console.log("question data is null");
            return;
        }
        let answerDocRef;
        if (user) {
            answerDocRef = await AddNewAnswer({ userId: user.uid, questionId: questionData.questionId, answer: answer });
        } else {
            answerDocRef = await AddNewAnswerAsNotUser({ userName: name ?? "anonymous", questionId: questionData.questionId, answer: answer });
        }
    };

    const handleOnChange = (event) => {
        const target = event.target;
        switch (target.id) {
            case "answer":
                setAnswer(target.value);
                break;
            case "name":
                setName(target.value);
                break;
        }
    }

    return (
        <> {
            questionData == null
                ? <>cannot find question data</>
                : <>
                    {questionData.creatorId}의 질문
                    {questionData.question}
                    <TextField id="answer" label={"answer"} variant="outlined" value={answer} onChange={(event) => handleOnChange(event)} />
                    {
                        user == null
                            ? <TextField id="name" label={"name"} variant="outlined" value={name} onChange={(event) => handleOnChange(event)} />
                            : <></>
                    }
                    <Button variant="contained" onClick={handleClick} disabled={user != null ? (answer == '') : (answer == '' || name == '')}>제출하기</Button>
                </>
        }
        </>
    );
};

export default AnswerQuestionForm;