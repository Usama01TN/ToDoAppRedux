import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: nanoid(), description: "Learn React", isDone: true },
    { id: nanoid(), description: "Learn Redux", isDone: false },
  ],
  filter: "all", // "all" | "done" | "notDone"
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      // every task gets an id, a description and an isDone flag
      prepare(description) {
        return { payload: { id: nanoid(), description, isDone: false } };
      },
    },
    toggleTask(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.isDone = !task.isDone;
    },
    editTask(state, action) {
      const { id, description } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.description = description;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, editTask, deleteTask, setFilter } =
  todoSlice.actions;

export default todoSlice.reducer;
