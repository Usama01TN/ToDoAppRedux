import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/todoSlice";
import Task from "./Task";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "done", label: "Done" },
  { value: "notDone", label: "Not done" },
];

const ListTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.tasks);
  const filter = useSelector((state) => state.todos.filter);

  const visibleTasks = tasks.filter((task) => {
    if (filter === "done") return task.isDone;
    if (filter === "notDone") return !task.isDone;
    return true;
  });

  return (
    <div>
      <div className="filters">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            className={filter === value ? "active" : "secondary"}
            onClick={() => dispatch(setFilter(value))}
          >
            {label}
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <p className="empty">No tasks to show.</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListTask;
