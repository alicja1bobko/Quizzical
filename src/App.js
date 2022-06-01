import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import yellowBlob from './images/yellow-blob.png';
import blueBlob from './images/blue-blob.png';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Pages/Menu';
import Quiz from './Pages/Quiz';
import { Result } from './Pages/Result';

function App() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category, difficulty, type) => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=5${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}${type && `&type=${type}`}`
    )
    console.log(data);
  }

    return (
    <BrowserRouter>
    <main>
      <img id="yellow-blob" src={yellowBlob} alt="yellow blob" />
        <Routes>
            <Route exact path="/" element={
              <Menu
                fetchQuestions={fetchQuestions}
              />
            } />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/result" element={<Result/>}/>
      </Routes>
      <img id="blue-blob" src={blueBlob} alt="blue blob" />
      </main>
      </BrowserRouter>
  );
}

export default App;



