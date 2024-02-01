import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
import { Button } from "@nextui-org/react";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer]
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <section className="quiz rounded-2xl bg-yellow-100/30">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 className="text-[32px] min-h-28 text-center mb-10 font-bold max-sm:text-2xl max-sm:min-h-36">
            {question}
          </h2>
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswer(correct_answer === answer)}
                >
                  {answer}
                </button>
              );
            })}
          </div>
          <div className="flex justify-end mt-8">
            <Button
              onClick={nextQuestion}
              className="relative flex w-full max-w-80 bg-amber-500/90 text-base font-semibold"
            >
              Next question
            </Button>
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
