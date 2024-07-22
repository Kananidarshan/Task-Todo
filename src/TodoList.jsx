import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
  const storedTasks = localStorage.getItem("Tasks");
  const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];

  const [tasks, setTasks] = useState(initialTasks);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editPriority, setEditPriority] = useState("low");
  const [editDueDate, setEditDueDate] = useState("");

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (task.trim()) {
      const newTask = { text: task, priority, dueDate, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask("");
      setPriority("low");
      setDueDate("");
      updateLocalStorage(updatedTasks);
      toast.success("Task added successfully!");
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
    toast.success("Task removed successfully!");
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const startEditing = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setEditTask(tasks[index].text);
    setEditPriority(tasks[index].priority);
    setEditDueDate(tasks[index].dueDate);
  };

  const updateTask = () => {
    if (editTask.trim()) {
      const updatedTasks = tasks.map((task, index) =>
        index === currentTaskIndex
          ? {
              ...task,
              text: editTask,
              priority: editPriority,
              dueDate: editDueDate,
            }
          : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
      setEditTask("");
      setEditPriority("low");
      setEditDueDate("");
      updateLocalStorage(updatedTasks);
      toast.success("Task updated successfully!");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-center text-3xl font-bold text-white mb-4">
        To-do List
      </h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-center">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-3 border rounded-lg w-full sm:w-auto"
            placeholder="Enter a new task"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-3 border rounded-lg"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>

        <ul className="mt-6 space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0"
            >
              <div className="flex items-center space-x-4 w-full">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="w-5 h-5"
                />
                {isEditing && currentTaskIndex === index ? (
                  <div className="flex flex-col w-full space-y-2">
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      className="p-3 border rounded-lg w-full"
                    />
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      className="p-3 border rounded-lg"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                      className="p-3 border rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col w-full">
                    <span
                      className={`text-lg ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {task.text} (Priority: {task.priority})
                    </span>
                    {task.dueDate && (
                      <span className="text-gray-300">
                        Due Date: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                {isEditing && currentTaskIndex === index ? (
                  <button
                    onClick={updateTask}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(index)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => removeTask(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoList;
