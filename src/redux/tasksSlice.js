import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: Date.now(),
        ...action.payload,
        completed: false,
      });
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.status = task.completed ? "Completed" : "Not Started";
      }
    },
    editTask: (state, action) => {
      const { id, title, description, dueDate, priority, status, category } =
        action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.status = status;
        task.category = category;
      }
    },
  },
});

export const { addTask, deleteTask, toggleTaskCompletion, editTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
