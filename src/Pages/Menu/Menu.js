
import Categories from '../../components/Categories';
import './Menu.css'
import { useState, useEffect, useContext } from 'react'
import { QuestionsContext } from '../../components/QuestionsContext';
import { useNavigate } from 'react-router-dom';
import { generateQuestionsState } from './generateQuestionsState';

export default function Menu() {
    const [questions, setQuestions] = useContext(QuestionsContext);
    const [fetchingError, setFetchingError] = useState(false);
    
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setFetchingError(false);
    }, [category, difficulty, type]);

    const fetchQuestions = (category, difficulty, type) => {
        return fetch(
            `https://opentdb.com/api.php?amount=5${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}${type && `&type=${type}`}`
        ).then((res) => res.json())
            .then(data => data.results)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchQuestions(category, difficulty, type).then(questions => {
            if (questions.length === 0) {
                setFetchingError(true);
                return;
            } else {
                setQuestions(generateQuestionsState(questions));
                setFetchingError(false);
                navigate('/quiz');
            }
        });
    };
        
        
    return (
        <section className='game--intro'>
            <h1 className='game--title'>Quizzical</h1>
            <p className='game--text'>Answer the questions and test your knowledge!</p>

            {fetchingError && <h2 className='questions--error'>Oops! We couldn't find any questions with these options!</h2>}
                <form onSubmit={handleSubmit}>
                <div className='game--options'>
                    <label htmlFor='category' className='options--label'>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        name="category"
                        id="category"
                        className='options--select'>
                
                        <option value="">Any category</option>
                         <Categories />
                        </select>
                  

                <label htmlFor='difficulty' className='options--label'>Difficulty:</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        name="difficulty"
                        id="difficulty"
                        className='options--select'>
                        
                        <option value="">Any difficulty</option>
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
                        <option value="">Any type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                </select>
          
                </div>
                <button type="button" onClick={ handleSubmit} className='game--start'>Start Quiz</button>
            </form>
           

        </section>
    )
}