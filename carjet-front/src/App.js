import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { MainApp } from "./components/shared/Main";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import LoadingContext from "./context/LoadingContext";
import GlobalStyle from './assets/css/GlobalStyle';
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Login from "./pages/Login";
import StockParam from "./pages/StockParam";
import Upload from "./pages/Upload";
import Alert from "./components/shared/Alert";

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
    <GlobalStyle/>
      <AlertProvider>
      <AuthProvider>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Alert/>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="app" element={<MainApp/>}>
                <Route path="/app/home" element={<Home/>} />
                <Route path="/app/stock" element={<Stock stock={true}/>} key="estoque"/>
                <Route path="/app/stock/:id" element={<StockParam/>} />
                <Route path="/app/upload" element={<Upload/>} />
                <Route path="/app/services" element={<Stock stock={false}/>} key="filiais"/>
              </Route>
            </Routes>
          </BrowserRouter>
      </LoadingContext.Provider>
      </AuthProvider>
      </AlertProvider>
    </>
  );
}