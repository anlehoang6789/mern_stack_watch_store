import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Details from "./pages/Details";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import Account from "./pages/Account";
import Footer from "./components/Footer";
import BrandPage from "./pages/BrandPage";
import WatchesList from "./pages/WatchesList";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute isAdminRoute={true}>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brand"
            element={
              <ProtectedRoute isAdminRoute={true}>
                <BrandPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watches"
            element={
              <ProtectedRoute isAdminRoute={true}>
                <WatchesList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
