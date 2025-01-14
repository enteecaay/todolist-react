import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface AddTaskProps {
  onAddTask: (task: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
      };
      onAddTask(newTask);
      setTaskTitle("");
    }
  };

  return (
    <div className="add-task relative">
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add a new task"
        className="border rounded-lg pl-6 h-12 w-full relative"
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white font-bold h-12 px-4 rounded-lg absolute right-0"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
