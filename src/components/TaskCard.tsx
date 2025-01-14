import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEditClick = () => {
    if (isEditing) {
      onEdit({ ...task, title: editedTitle });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task-card p-4 border rounded-lg shadow-md flex justify-between items-center">
      <div className="flex gap-2 items-center w-full">
        <input
          className="w-6 h-6"
          type="checkbox"
          checked={task.completed}
          onChange={() => onEdit({ ...task, completed: !task.completed })}
        />
        {isEditing ? (
          <input
            className="lg:font-bold lg:text-lg w-full font-semibold"
            value={editedTitle}
            onKeyDown={(e) => e.key === "Enter" && handleEditClick()}
            onBlur={handleEditClick}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <span className="lg:font-bold lg:text-lg font-semibold text-sm">
            {task.title}
          </span>
        )}
      </div>
      <div className="flex gap-1">
        <button
          className="bg-blue-500 p-2 lg:px-4 font-semibold rounded-lg text-white lg:text-base text-sm"
          onClick={handleEditClick}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="bg-red-500 p-2 lg:px-4 font-semibold rounded-lg text-white lg:text-base text-sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
