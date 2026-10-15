import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/Home/LandingPage";
import UserHome from "./pages/Home/UserHome";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import FarmList from "./pages/Farm/FarmList";
import FarmForm from "./pages/Farm/FarmForm";
import CropList from "./pages/Crop/CropList";
import CropForm from "./pages/Crop/CropForm";
import CropInfoList from "./pages/CropInfo/CropInfoList";
import CropInfoDetail from "./pages/CropInfo/CropInfoDetail";
import Weather from "./pages/Weather/Weather";
import ProductList from "./pages/Product/ProductList";
import MyBookings from "./pages/Booking/MyBookings";
import MyAlerts from "./pages/Alert/MyAlerts";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminAlerts from "./pages/Admin/AdminAlerts";
import UserProfile from "./pages/Profile/UserProfile";

function RootPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <UserHome />;
}

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Root: Landing Page for guests, User Home for logged-in farmers */}
          <Route
            path="/"
            element={
              <Layout>
                <RootPage />
              </Layout>
            }
          />

          {/* Farm Routes */}
          <Route
            path="/farms"
            element={
              <ProtectedRoute>
                <Layout>
                  <FarmList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/farms/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <FarmForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/farms/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <FarmForm />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Crop Routes */}
          <Route
            path="/farms/:farmId/crops"
            element={
              <ProtectedRoute>
                <Layout>
                  <CropList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/farms/:farmId/crops/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <CropForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/farms/:farmId/crops/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CropForm />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Crop Information Routes */}
          <Route
            path="/crop-info"
            element={
              <ProtectedRoute>
                <Layout>
                  <CropInfoList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/crop-info/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CropInfoDetail />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Weather Route */}
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <Layout>
                  <Weather />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Marketplace & Commerce Routes */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProductList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyBookings />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-alerts"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyAlerts />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Profile Route (all logged-in users) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserProfile />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <Layout>
                  <AdminUsers />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <Layout>
                  <AdminProducts />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute adminOnly>
                <Layout>
                  <AdminBookings />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/alerts"
            element={
              <ProtectedRoute adminOnly>
                <Layout>
                  <AdminAlerts />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect to / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
