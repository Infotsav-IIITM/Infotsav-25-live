import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import MainLayout from "./Layouts/MainLayout";
import Error404 from "./Components/Other/Error404";
import Sponsors from "./Pages/Sponsors";
import ComingSoon from "./Pages/ComingSoon";
import LoadingScreen from "./Components/Other/LoadingScreen";
import EventsPage from "./Pages/EventsPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has visited before in this session
    const visited = sessionStorage.getItem("hasVisitedInfotsav");
    if (visited) {
      setHasVisited(true);
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    // Mark as visited in session storage
    sessionStorage.setItem("hasVisitedInfotsav", "true");
    setHasVisited(true);
    setIsLoading(false);
  };

  // Show loading screen only on first visit
  if (isLoading && !hasVisited) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/register" element={<ComingSoon />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/ambassador" element={<ComingSoon />} />
          <Route path="/contact" element={<ComingSoon />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
