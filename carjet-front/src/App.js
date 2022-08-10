import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { MainApp } from "./components/shared/Main";
import { AuthProvider } from "./context/AuthContext";
import LoadingContext from "./context/LoadingContext";
import GlobalStyle from './assets/css/GlobalStyle';
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Assignments from "./pages/Assignments";
import Login from "./pages/Login";
import StockParam from "./pages/StockParam";

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
                <Route path="/app/stock" element={<Stock/>} />
                <Route path="/app/stock/:id" element={<StockParam/>} />
                <Route path="/app/assignments" element={<Assignments/>} />
              </Route>
            </Routes>
          </BrowserRouter>
      </LoadingContext.Provider>
      </AuthProvider>
    </>
  );
}