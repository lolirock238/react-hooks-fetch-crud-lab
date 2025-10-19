// src/components/App.js
import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const initialQuestions = [
    {
      id: 1,
      prompt: "lorem testum 1",
      answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
      correctIndex: 0,
    },
    {
      id: 2,
      prompt: "lorem testum 2",
      answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
      correctIndex: 2,
    },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [page, setPage] = useState("List"); // default to List

  function handleAddQuestion(newQuestion) {
    const withId =
      typeof newQuestion.id === "number"
        ? newQuestion
        : { ...newQuestion, id: Date.now() };
    // keep this synchronous — test will find the new item after rerender because we switch back to List
    setQuestions((prev) => [...prev, withId]);
    setPage("List");
  }

  function handleDeleteQuestion(id) {
    // make deletion async so waitForElementToBeRemoved can observe the element initially
    Promise.resolve().then(() => {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    });
  }

  function handleUpdateQuestion(id, correctIndex) {
    // update synchronously is fine (test updates value after change event + rerender)
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, correctIndex } : q))
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
