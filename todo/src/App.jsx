import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  // Prevent form submission default action and unnecessary input reset
  const handleChange = (e) => {
    e.preventDefault();
    console.log(`submitted value : ${input}`);
  };

  // Add task logic with empty input validation
  const addTask = () => {
    if (!input.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    const newTask = { id: Date.now(), text: input, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
    setInput(""); // Clear input after adding task
  };

  // Delete a task by filtering it out from the tasks array
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
  };

  // Start editing a task
  const startEditing = (id, text) => {
    setIsEditing(id);
    setInput(text);
  };

  // Save edited task
  const saveTask = () => {
    if (!input.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    const updatedTasks = tasks.map((task) =>
      task.id === isEditing ? { ...task, text: input } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
    setInput("");
    setIsEditing(null);
  };

  // Load tasks from localStorage when the app is first loaded
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Form Section */}
      <form
        onSubmit={handleChange}
        className="w-full max-w-md flex flex-col items-center space-y-4 bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800">To-Do App</h1>
        <div className="w-full flex gap-4">
          <input
            type="text"
            value={input}
            placeholder="Type here..."
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-800"
          />
          {isEditing ? (
            <button
              onClick={saveTask}
              className="px-6 py-2 bg-red-400 text-white font-semibold rounded hover:bg-red-500 transition"
            >
              Save
            </button>
          ) : (
            <button
              type="submit"
              onClick={addTask}
              className="px-6 py-2 bg-lime-400 text-white font-semibold rounded hover:bg-lime-500 transition"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {/* Task List Section */}
      <div className="w-full max-w-md mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">To-Do List</h2>
        <ul className="divide-y divide-gray-300 rounded-md border border-gray-200 bg-white">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 transition-colors ${
                task.completed ? "bg-green-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="cursor-pointer h-4 w-4 text-lime-400 focus:ring-lime-500"
                />
                <span
                  className={`text-sm md:text-base ${
                    task.completed ? "line-through text-green-500" : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEditing(task.id, task.text)}
                  className="px-3 py-1 text-xs md:text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-xs md:text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
