import React from "react";
import TodoList from "./TodoList";
function App() {
  function handleChange() {
    console.log("test");
  }
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
