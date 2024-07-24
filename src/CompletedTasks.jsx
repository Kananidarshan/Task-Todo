import React from "react";
import { Link } from "react-router-dom";

const CompletedTasks = () => {
  const storedTasks = localStorage.getItem("Tasks");
  const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];
  const completedTasks = initialTasks.filter((task) => task.completed);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-center text-3xl font-bold text-white mb-4">
        Completed Tasks
      </h1>
      <div className="border border-spacing-2 border-white px-2 py-2">
        {completedTasks.length > 0 ? (
          <ul className=" space-y-4">
            {completedTasks.map((task, index) => (
              <li
                key={index}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <span className="text-lg text-white">{task.text}</span>
                <span className="text-gray-300">
                  Completed Date: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <h1 className="text-white text-center">No Completed Tasks Present</h1>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/">
          <button className="bg-gray-500 rounded-md">
            <h1 className="text-white px-2 py-1">Back to Todo List</h1>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompletedTasks;
