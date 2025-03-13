
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthRoute from './components/AuthRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/Signup'; // Fixed the import path - it's 'Signup' not 'SignUp'
import Apply from './pages/Apply';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import Index from './pages/Index';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          {/* Fixed AuthRoute usage by properly wrapping the element */}
          <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
          <Route path="/apply" element={<AuthRoute><Apply /></AuthRoute>} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
