import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import LoadingContext from "../context/LoadingContext";
import InfoContext from "../context/InfoContext";
import GlobalStyle from '../assets/css/GlobalStyle';
import Home from "../pages/Home";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [sideBar, setSidebar] = useState(false);

  return (
    <>
    <GlobalStyle/>
      <InfoContext.Provider value={{ sideBar, setSidebar }}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
            </Routes>
          </BrowserRouter>
      </LoadingContext.Provider>
      </InfoContext.Provider>
    </>
  );
}