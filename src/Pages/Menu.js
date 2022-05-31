import React, { useState } from 'react'


import Categories from '../components/Categories';

export default function Menu(props) {


    const [formData, setFormData] = useState(
        {
            category: "any",
            difficulty: "any",
            type: "any"
        }
    )
    
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
                }
            })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
      
    }


    return (
        <section className='game--intro'>
            <h1 className='game--title'>Quizzical</h1>
            <p className='game--text'>Answer the questions and test your knowledge!</p>
                <form onSubmit={handleSubmit}>
                <div className='game--options'>
                    <label htmlFor='category' className='options--label'>Category:</label>
                <select
                        value={formData.category}
                        onChange={handleChange}
                        name="category"
                        id="category"
                        className='options--select'
                >
                        <option value="any">Any category</option>
                         <Categories />
                        </select>
                  

                <label htmlFor='difficulty' className='options--label'>Difficulty:</label>
                    <select
                        value={formData.difficulty}
                        onChange={handleChange}
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
                        value={formData.type}
                        onChange={handleChange}
                        name="type"
                        id="type"
                        className='options--select'>
                        <option value="any">Any type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                </select>
          
                </div>
                <button type="button" onClick={() => { props.showQuiz(true) }} className='game--start'>Start Quiz</button>
            </form>
           

        </section>
    )
}