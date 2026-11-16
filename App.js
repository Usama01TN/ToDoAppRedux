import React from "react";
import Addtask from "./components/Addtask";
import ListTask from "./components/ListTask";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>ToDo App</h1>
      <Addtask />
      <ListTask />
    </div>
  );
};

export default App;
