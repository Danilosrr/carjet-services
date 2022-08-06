import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { MainApp } from "./components/shared/Main";
import { AuthProvider } from "./context/AuthContext";
import LoadingContext from "./context/LoadingContext";
import GlobalStyle from './assets/css/GlobalStyle';
import Home from "./pages/Home";
import Store from "./pages/Store";
import Assignments from "./pages/Assignments";
import Login from "./pages/Login";

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
    <GlobalStyle/>
      <AuthProvider>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="app" element={<MainApp/>}>
                <Route path="/app/home" element={<Home/>} />
                <Route path="/app/subsidiary/:id" element={<Store/>} />
                <Route path="/app/assignments" element={<Assignments/>} />
              </Route>
            </Routes>
          </BrowserRouter>
      </LoadingContext.Provider>
      </AuthProvider>
    </>
  );
}