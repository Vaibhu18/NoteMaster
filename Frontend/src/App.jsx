import React from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return(
    <Routes>
    <Route path="/" element={<h1>Home page</h1>} />
    <Route path="/about" element={<h1>ABout page</h1>} />
  </Routes>
  )
};

export default App;



