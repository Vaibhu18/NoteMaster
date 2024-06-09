import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Profile from "./Components/Profile";
import AddTodo from "./Components/CreateNote";
import UpdateNote from "./Components/UpdateNote";
import ErrorPage from "./Components/ErrorPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/profile/addTodo/:userId" element={<AddTodo />} />
      <Route path="/profile/updateNote/:noteId" element={<UpdateNote />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
