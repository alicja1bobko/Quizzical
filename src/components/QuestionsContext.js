import React, {useState, createContext } from 'react'

export const QuestionsContext = createContext();

export const QuestionsProvider = (props) => {
    const [questions, setQuestions] = useState([]);

    return (
        <QuestionsContext.Provider value={[questions, setQuestions]}>
            {props.children}
        </QuestionsContext.Provider>
    );
    
    }
