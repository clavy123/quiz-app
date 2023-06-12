
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { quiz } from "./quiz";
function App() {
  const [activeQuestion, setactiveQuestion] = useState(0);
  const [selectedAnswer, setselectedAnswer] = useState("");
  const [ansindex, setindex] = useState(null)
  const [result, setresult] = useState(false);
  const [finalResult, setfinalResult] = useState({
    score:0,
    correctAns:0,
    wrongAnswer:0,
  })
  const { questions } = quiz;
  const { question, option, correctAnswer } = questions[activeQuestion];
  function onClickNext() {
    setindex(null)
    setfinalResult((prev) =>
      selectedAnswer ? {
        ...prev,
        score:prev.score+10,
        correctAns:prev.correctAns+1,
        
      } : {
        ...prev,
        wrongAnswer:prev.wrongAnswer+1
      }
    )
    if (activeQuestion !== questions.length - 1) {
      setactiveQuestion((prev) => prev + 1);
    } else {
      setactiveQuestion(0);
      setresult(true);
    }
  }
  function OnSelectedAnswer(answer,index) {
    setindex(index)
    if (answer === correctAnswer) {
      setselectedAnswer(true);
    } else {
      setselectedAnswer(false);
    }
  }

  return (
    <>
    <p className="entry">Welcome to quiz!!!</p>
    <div className="container">
      {!result ? (
        <div>
          <h1>{question}</h1>
          <ul>
            {option.map((answer,index) => (
              <li onClick={() => OnSelectedAnswer(answer,index)}
              className={
                ansindex === index?"selected-answer" :null 
              }
               key={answer}>
                {answer}
              </li>
            ))}
          </ul>
          <button onClick={onClickNext}>next</button>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>Total Question : <span>{questions.length}</span></p>
          <p>Total Score : <span>{finalResult.score}</span></p>
          <p>correctAnswer :  <span>{finalResult.correctAns}</span></p>
          <p>WrongAnswer : <span>{finalResult.wrongAnswer}</span></p>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
