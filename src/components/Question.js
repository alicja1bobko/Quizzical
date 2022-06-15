import { decode } from 'html-entities';
import React from 'react';
import './Question.css'

function Option(props) {
    let bcgcolor = "";
    let border = "";
    let opacity = "";

    if (props.isGameOver) {
        if (props.isCorrect) {
            bcgcolor = "#94D7A2";
            border = "none";
        } else if (props.isSelected && !props.isCorrect) {
            bcgcolor = "#F8BCBC";
            border = "none";
            opacity = "50%";
        } else if (!props.isSelected && !props.isCorrect) {
            opacity = "50%"
        }
    } else if (props.isSelected) {
        bcgcolor = "#D6DBF5";
        border = "none";
    } 
    
    const style = {
        backgroundColor: bcgcolor,
        border: border,
        opacity: opacity
    }   
    return (
        <span className='options' style={style} onClick={() => props.handleSelectAnswer(props.parentId, props.id)}>{decode(props.value)}</span>
    )
}

const Question = ({
    id,
    question,
    choices,
    isGameOver,
    handleSelectAnswer
}) => {

    const optionsElements = choices.map((choice) => (
        <Option
            parentId={id}
            id={choice.id}
            key={choice.value}
            value={choice.value}
            isGameOver={isGameOver}
            handleSelectAnswer={handleSelectAnswer}
            isSelected={choice.isSelected}
            isCorrect={choice.isCorrect}
        /> 
    ))

    return (
        <>
        <article className="question-container">
                <h3 className="question--text"> {decode(question)}</h3>
                {optionsElements}
        </article>
            </>
    )
}

export default Question;