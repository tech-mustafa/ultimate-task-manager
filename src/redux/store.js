import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("tasks", serializedState);
};

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: loadState(),
  },
});

store.subscribe(() => {
  saveState(store.getState().tasks);
});

export default store;
