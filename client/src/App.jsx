import { Navigate, Route, Routes } from "react-router-dom";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import HomePage from "./pages/HomePage";
import NotificationPage from "./pages/NotificationPage";
import LoginPage from "./pages/LoginPage";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

function App() {
    const { user } = useAppContext();

    const isAuthenticated = Boolean(user);
    const isOnboarded = user?.isOnboarded;

    return (
        <div>
            <Toaster />
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated && isOnboarded ? (
                            <HomePage />
                        ) : (
                            <Navigate
                                to={!isAuthenticated ? "/login" : "/onboarding"}
                            />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? <Navigate to={"/"} /> : <LoginPage />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        isAuthenticated ? <Navigate to={"/"} /> : <SignupPage />
                    }
                />
                <Route
                    path="/notification"
                    element={
                        isAuthenticated ? (
                            <NotificationPage />
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    }
                />
                <Route
                    path="/chat-page"
                    element={
                        isAuthenticated ? (
                            <ChatPage />
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    }
                />
                <Route
                    path="/call-page"
                    element={
                        isAuthenticated ? (
                            <CallPage />
                        ) : (
                            <Navigate to={"login"} />
                        )
                    }
                />
                <Route
                    path="/onboarding"
                    element={
                        isAuthenticated ? (
                            <OnboardingPage />
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
