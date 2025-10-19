// src/components/QuestionForm.js
import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: "0",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      prompt: formData.prompt,
      answers: [
        formData.answer1 || "choice 1",
        formData.answer2 || "choice 2",
        formData.answer3 || "choice 3",
        formData.answer4 || "choice 4",
      ],
      correctIndex: parseInt(formData.correctIndex, 10),
    };

    if (typeof onAddQuestion === "function") {
      onAddQuestion(payload);
    }

    setFormData({
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: "0",
    });
  }

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            name="prompt"
            placeholder="Prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>

        <label>
          Answer 1:
          <input
            name="answer1"
            placeholder="Answer 1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>

        <label>
          Answer 2:
          <input
            name="answer2"
            placeholder="Answer 2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>

        <label>
          Answer 3:
          <input
            name="answer3"
            placeholder="Answer 3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>

        <label>
          Answer 4:
          <input
            name="answer4"
            placeholder="Answer 4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>

        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>

        <div>
          <button type="submit">Add Question</button>
        </div>
      </form>
    </section>
  );
}

export default QuestionForm;
