// src/components/QuestionItem.js
import React from "react";

/*
Renders the exact structure the tests expect:
- <h4>Question {id}</h4>
- <h5>Prompt: {prompt}</h5>
- label "Correct Answer:" with select; options show "choice 1" ...
- Delete button text "Delete Question"
*/

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  if (!question) return null;
  const { id, prompt, answers = [], correctIndex = 0 } = question;

  function handleDelete() {
    if (typeof onDeleteQuestion === "function") {
      onDeleteQuestion(id);
    }
  }

  function handleCorrectChange(e) {
    const newIndex = parseInt(e.target.value, 10);
    if (typeof onUpdateQuestion === "function") {
      onUpdateQuestion(id, newIndex);
    }
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>

      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectChange}>
          {answers.map((_, idx) => (
            <option key={idx} value={idx}>
              {`choice ${idx + 1}`}
            </option>
          ))}
        </select>
      </label>

      <div>
        <button onClick={handleDelete}>Delete Question</button>
      </div>
    </li>
  );
}

export default QuestionItem;
