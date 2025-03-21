import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Inicio from "./Pages/Inicio";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Inicio" element={<Inicio/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
