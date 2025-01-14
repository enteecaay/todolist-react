import { useEffect, useState } from "react";
import "./App.css";
import TaskCard from "./components/TaskCard";
import AddTask from "./components/AddTask";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    return JSON.parse(localStorage.getItem("taskList") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const editTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <div className="w-full h-full mt-8 min-h-screen flex justify-center items-center border-2 border-gray-100 bg-violet-400 relative rounded-xl">
        <div className="bg-red-700 p-4 rounded-lg text-white absolute -top-10 right-10 m-2">
          <h1 className="font-serif font-bold lg:text-3xl"> Todo-List App</h1>
        </div>
        <div className="w-10/12 h-full bg-white p-4 rounded-lg shadow-lg flex flex-col">
          <AddTask onAddTask={addTask} />
          <div className="w-10-12 h-full max-h-screen flex flex-col gap-4 mt-10">
            <h2 className="font-bold text-xl font-merri">Task List</h2>
            <div className="flex-grow overflow-y-scroll space-y-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={editTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
