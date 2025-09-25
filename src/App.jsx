import React from "react";
import DragDropList from "./components/DragDropList";

function App() {
  return (
    <div style={{ width: "400px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Drag & Drop Tasks</h1>
      <DragDropList />
    </div>
  );
}

export default App;
