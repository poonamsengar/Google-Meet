import React, { useEffect, useState } from "react";
import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeColorMode,
  EuiThemeProvider,
} from "@elastic/eui";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import OnOneOnMeeting from "./pages/OnOneOnMeeting";
import { setToasts } from "./app/slices/meetingSlice";
import VideoConference from "./pages/VideoConference";
import MyMeetings from "./pages/MyMeetings";

const App = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((zoom)=>zoom.meetings.toasts)
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialTheme, setInitialTheme] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (isInitialTheme) setInitialTheme(false);
    else {
      window.location.reload();
    }
  }, [isDarkTheme]);
  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };
  const removeToast = (removeToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removeToast.id)
      )
    );
  };
  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/CreateMeeting" element={<CreateMeeting />} />
            <Route path="/create1on1" element={<OnOneOnMeeting />} />
            <Route path="/VideoConference" element={< VideoConference />} />
            <Route path="/mymeetings" element={<MyMeetings/>}  />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={5000}
          />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
};

export default App;
