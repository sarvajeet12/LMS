import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Offline from "./components/common/Offline";

const App = () => {
  // --------------------------------------- offline or not -----------------------------------------------------------------------
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline); // Clean up event listeners on component unmount

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{isOnline ? <Outlet /> : <Offline />}</>;
};

export default App;
