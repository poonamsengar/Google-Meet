import React, { useEffect, useState } from "react";
import { EuiProvider,EuiThemeColorMode,EuiThemeProvider } from "@elastic/eui";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import OnOneOnMeeting from "./pages/OnOneOnMeeting";

const App = () => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
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
      <ThemeSelector> 
    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateMeeting" element={<CreateMeeting />} />
          <Route path="/create1on1" element={<OnOneOnMeeting />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </EuiThemeProvider>
    </EuiProvider>
    </ThemeSelector>
  );
};

export default App;