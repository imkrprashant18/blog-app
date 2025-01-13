import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/404/404";

const HomePage = lazy(() => import("./pages/home/home-page"));
const Animated = lazy(() => import("./pages/fall-back/Animated"));
const RegisterPage = lazy(() => import("./pages/sign-up/sign-up"));
const Login = lazy(() => import("./pages/login/login"));
const DashboardPage = lazy(() => import("./pages/dashboard/dashboard"));
const ProtectedRoute = lazy(() => import("./components/routes/private-route"));
const PublicRoute = lazy(() => import("./components/routes/public-routes"));
const Profile = lazy(() => import("./pages/profile/profile"));
const App = () => {
  return (
    <Router>
      <Suspense fallback={<Animated />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
