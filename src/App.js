import React from 'react'
import './App.css';
import yellowBlob from './images/yellow-blob.png';
import blueBlob from './images/blue-blob.png';
import { HashRouter , Route, Routes } from 'react-router-dom';
import Menu from './Pages/Menu/Menu';
import Quiz from './Pages/Quiz/Quiz';
import { QuestionsProvider } from './components/QuestionsContext';

function App() {

  return (
    <QuestionsProvider>
    <main>
      <img id="yellow-blob" src={yellowBlob} alt="yellow blob" />
        <HashRouter>
           <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/quiz" element={<Quiz/>} />
           </Routes>
        </HashRouter >
      <img id="blue-blob" src={blueBlob} alt="blue blob" />
      </main>
      </QuestionsProvider>
  );
}

export default App;



