import { Navigate, Route, Routes } from "react-router-dom";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import HomePage from "./pages/HomePage";
import NotificationPage from "./pages/NotificationPage";
import LoginPage from "./pages/LoginPage";
import { useAppContext } from "./context/AppContext";

function App() {

  const { user } = useAppContext();

  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={user ? <Navigate to={'/'} /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to={'/'} /> : <SignupPage />} />
        <Route path="/notification" element={user ? <NotificationPage /> : <Navigate to={'/login'} />} />
        <Route path="/chat-page" element={user ? <ChatPage /> : <Navigate to={'/login'} />} />
        <Route path="/call-page" element={user ? <CallPage /> : <Navigate to={'login'} />} />
        <Route path="/onboarding" element={user ? <OnboardingPage /> : <Navigate to={'/login'} />} />
      </Routes>
    </div>
  );
}

export default App;
