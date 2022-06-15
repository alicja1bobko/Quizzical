import React, { useContext, useEffect, useState } from 'react'
import Question from '../../components/Question';
import { nanoid } from 'nanoid'
import './Quiz.css'
import { useNavigate } from 'react-router-dom'
import { QuestionsContext } from '../../components/QuestionsContext';


export default function Quiz() {
    const [questions, setQuestions] = useContext(QuestionsContext);
    const [score, setScore] = useState(0);
    const [checkAnswersBtn, setCheckAnswersBtn] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
  
    useEffect(() => {
        setCheckAnswersBtn(questions.every(question => {
            return question.choices.find(choice =>
                choice.isSelected === true)
        }));
    }, [questions]);
    
    const handleSelectAnswer = (questionId, choiceId) => {
        if (!isGameOver) {
            setQuestions(prevQuestionsArray => {
                return prevQuestionsArray.map(question => {
                    return (question.id !== questionId) ?
                        question
                        :
                        {
                            ...question,
                            choices: question.choices.map(choice =>
                                (choice.id === choiceId) ?
                                    {
                                        ...choice,
                                        isSelected: !(choice.isSelected)
                                    }
                                    :
                                    {
                                        ...choice,
                                        isSelected: false
                                    }
                            )
                        }
                })
            })
        }
    }

    const questionElements = questions.map(question => (
        <Question
            key={nanoid()}
            id={question.id}
            question={question.question}
            choices={question.choices}
            isGameOver={isGameOver}
            handleSelectAnswer={handleSelectAnswer}
        />
    ));
    
    
    const navigate = useNavigate();
    const resetGame = () => {
        navigate('/');
    }

    const checkAnswers = () => {
        if (checkAnswersBtn) {
            calculateScore();
            setIsGameOver(true);
        }
    }   

    const calculateScore = () => {
        questions.forEach(question => {
             question.choices.forEach(choice => {
                if (choice.isCorrect && choice.isSelected) setScore(prevScore => prevScore + 1);
            })
        })
    }

    return (
        <>
            <section className='quiz' >
                <section className='quiz-container'>
                    { questionElements }
                </section>
                <section className='quiz-score'>
                    {isGameOver && <span className='score-text'>You scored {score}/5 correct answers</span>}
                <button
                    className={`quiz-btn ${checkAnswersBtn ? 'check-answers' : 'check-answers-disabled'}`}
                    onClick={isGameOver? resetGame : checkAnswers}
                >{isGameOver? 'Play again' : 'Check answers'}
                    </button>
                </section>
        </section>
       </>
    )
}
