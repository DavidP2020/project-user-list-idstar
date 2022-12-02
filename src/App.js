import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/Form/AddUser";
import EditUser from "./pages/Form/EditUser";
import Detail from "./pages/Detail/Detail";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addUser" element={<AddUser />}></Route>
        <Route path="/editUser/:id" element={<EditUser />}></Route>
        <Route path="/detailUser/:id" element={<Detail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
