import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Categories from '../components/Categories';

export default function Menu({fetchQuestions}) {

    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState('false');

    const navigate = useNavigate();

    function handleSubmit() {
        fetchQuestions(category, difficulty, type);
        navigate('/quiz');
    }
  

    return (
        <section className='game--intro'>
            <h1 className='game--title'>Quizzical</h1>
            <p className='game--text'>Answer the questions and test your knowledge!</p>

            {!error && <h2 className='questions--error'>Oops! We couldn't find any questions with these options!</h2>}
                <form onSubmit={handleSubmit}>
                <div className='game--options'>
                    <label htmlFor='category' className='options--label'>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        name="category"
                        id="category"
                        className='options--select'
                >
                        <option value="any">Any category</option>
                         <Categories />
                        </select>
                  

                <label htmlFor='difficulty' className='options--label'>Difficulty:</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        name="difficulty"
                        id="difficulty"
                        className='options--select'>
                        
                        <option value="any">Any difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                <label htmlFor='type' className='options--label'>Type of questions:</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        name="type"
                        id="type"
                        className='options--select'>
                        <option value="any">Any type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                </select>
          
                </div>
                <button type="button" onClick={ handleSubmit} className='game--start'>Start Quiz</button>
            </form>
           

        </section>
    )
}