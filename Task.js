import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTask, editTask, deleteTask } from "../redux/todoSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleSave = () => {
    const text = newDescription.trim();
    if (!text) return;
    dispatch(editTask({ id: task.id, description: text }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewDescription(task.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="task">
        <input
          type="text"
          value={newDescription}
          autoFocus
          onChange={(e) => setNewDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
        <button onClick={handleSave}>Save</button>
        <button className="secondary" onClick={handleCancel}>
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li className="task">
      <label className={task.isDone ? "done" : ""}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        <span>{task.description}</span>
      </label>
      <button className="secondary" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button className="danger" onClick={() => dispatch(deleteTask(task.id))}>
        Delete
      </button>
    </li>
  );
};

export default Task;
