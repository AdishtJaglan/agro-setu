import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ChatBot from "./pages/Help";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/help" element={<ChatBot />}></Route>
        <Route path="*" element={<Login />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

