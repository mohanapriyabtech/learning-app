import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/component/Login";
import Register from "./pages/component/Register";
import ForgotPassword from "./pages/component/ForgotPassword";
import Project from "./pages/component/Project";

export default function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
        <Route path="/project" exact element={<Project />}></Route>
      </Routes>
    </BrowserRouter>
   </>
  )
}
