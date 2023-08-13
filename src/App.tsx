import React, { useEffect, useState } from "react";
import { EuiProvider,EuiThemeColorMode,EuiThemeProvider } from "@elastic/eui";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelectore } from "./app/hooks";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./utils/OneOnOneMeeting";

const App = () => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelectore((zoom) => zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialTheme, setInitialTheme] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if(theme){
      setTheme(theme as EuiThemeColorMode)
    }else{
        localStorage.setItem("zoom-theme", "light");
    }
  },[])

  useEffect(()=> {
    if(isInitialTheme) setInitialTheme(false)
    else{
      window.location.reload()
    }
  }, [isDarkTheme])
  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };
  return (
    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateMeeting" element={<CreateMeeting />} />
          <Route path="/1neOn1neMeeting" element={<OneOnOneMeeting/>}/>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </EuiThemeProvider>
    </EuiProvider>
  );
};

export default App;