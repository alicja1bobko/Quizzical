import { nanoid } from 'nanoid'

export const generateQuestionsState = (questionsRawData) => {
    const questionsArray = questionsRawData.map(question => ({
      question: question.question,
      id: nanoid(),
      correctAnswer: question.correct_answer,
      choices: generateAnswersArray(question.correct_answer, question.incorrect_answers),
      showAnswer: false
    }))
    return questionsArray
  }

  const handleShuffle = (answerOptions) => {
            return answerOptions.sort(() => Math.random() - 0.5);
        }

  const generateAnswersArray = (correctAnswer, incorrectAnswers) =>{
    let output = incorrectAnswers.map(ans => ({
      value: ans,
      isCorrect: false,
      id: nanoid(),
      isSelected: false
    }));
    output.push({
      value: correctAnswer,
      isCorrect: true,
      id: nanoid(),
      isSelected:false
    })
    handleShuffle(output);
    return output
  }