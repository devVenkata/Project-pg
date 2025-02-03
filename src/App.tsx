import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/home/Layout';
import Home from './components/home/Home';
import Login from './components/store/Login';
import Register from './components/store/Register';
import ForgotPassword from './components/store/ForgotPassword';
import PGDetails from './components/pages/PGCardDetails';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/store/ProtectedRoute'; // Import ProtectedRoute
import AddPGForm from './components/listpgdetails/AddPGForm'; // Import the form component
import MobileView from './components/home/MobileView';
import DemoPage from './components/home/Demo';
// import Settings from './components/Settings/Settings';


function App() {
  return (
    <Router>
      <Toaster 
        position="top-center" 
        richColors 
        duration={2000}
        className="absolute top-1 w-[90%] md:w-auto"
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<DemoPage />} />
          <Route path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="pg/:id" element={
            <>
            <PGDetails />
            <Footer />
            </>
            } />
          <Route path="/list-your-pg" element={<AddPGForm />} /> {/* Form route */}

          {/* Protected Routes Placeholder (Add actual components later) */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <div>Dashboard Page Placeholder</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <div>Profile Page Placeholder</div>
              </ProtectedRoute>
            }
          />
          <Route path="mobile" element={<MobileView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;