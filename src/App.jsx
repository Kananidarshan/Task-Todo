import React from "react";
import TodoList from "./TodoList";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import CompletedTasks from "./CompletedTasks";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/CompletedTasks" element={<CompletedTasks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
