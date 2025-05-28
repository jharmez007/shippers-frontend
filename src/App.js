// App.jsx
import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import { ScrollToTop } from './hooks';
import {
  Home, Stakeholders, TankerFreight, Tools, CargoStatistics, Publications,
  Login, Signup, ResetPassword, NotFound, WhoAreYou, EmailVerification,
  Bank, FreightRateForm, FreightRateRequest, FreightAnalysis, Profile, Settings,
  CheckValidation, BankDashboard, MainBankDashboard, BankFreightRateRequest, 
  CharterPartyRequest, DemurrageRequest, SubmissionRequests, ConnectionRequests,
  ForgotPassword, RegulatorDashboard, MainRegulatorDashboard, RegulatorFreightRateRequest,
  RegulatorCharterPartyRequest, RegulatorDemurrageRequest
} from './pages';
import {
  Navbar, Footer, SignUpLayout, ProtectedRoute, Loader
} from './components';

import './App.scss';
import ShipperDashboard from './pages/ShipperDashboard/ShipperDashboard';
import MainDashboard from './pages/ShipperDashboard/MainDashboard';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="h-[140px] bg-slate-600 lg:h-20" />
    {children}
    <Footer />
  </>
);


const getTopSegment = (path) => path.split('/')[1] || '';

const AppRoutes = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(true);
  const [delayedLocation, setDelayedLocation] = useState(location); 

  useEffect(() => {
    const prevSegment = getTopSegment(prevPathRef.current);
    const currentSegment = getTopSegment(location.pathname);

    const segmentChanged = prevSegment !== currentSegment;

    if (segmentChanged) {
      setFade(false); 
      setLoading(true);

      const timeout = setTimeout(() => {
        setDelayedLocation(location);
        setLoading(false);
        setFade(true); 
        prevPathRef.current = location.pathname;
      }, 2500); 

      return () => clearTimeout(timeout);
    } else {
      setDelayedLocation(location); 
      prevPathRef.current = location.pathname;
    }
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      <div className={`transition-opacity duration-500 ${fade && 'opacity-100'}`}>
        <div className="app__container scroll-smooth snap-none">
          <Routes location={delayedLocation}> {/* Use delayedLocation for routing */}
            {/* Top-level public routes */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/stakeholders" element={<MainLayout><Stakeholders /></MainLayout>} />
            <Route path="/tanker-freight" element={<MainLayout><TankerFreight /></MainLayout>} />
            <Route path="/tools" element={<MainLayout><Tools /></MainLayout>} />
            <Route path="/cargo-statistics" element={<MainLayout><CargoStatistics /></MainLayout>} />
            <Route path="/publications" element={<MainLayout><Publications /></MainLayout>} />

            {/* Auth Routes */}
            <Route path="/whoareyou" element={<SignUpLayout />}>
              <Route index element={<WhoAreYou />} />
              <Route path="signup" element={<Signup />} />
              <Route path="email-verification" element={<EmailVerification />} />
              <Route path="check-validation" element={<CheckValidation />} />
            </Route>

            {/* Shipper Dashboard Routes */}
            <Route path="/shipper-dashboard" element={<ProtectedRoute><ShipperDashboard /></ProtectedRoute>}>
              <Route index element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
              <Route path="dashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
              <Route path="bank" element={<ProtectedRoute><Bank /></ProtectedRoute>} />
              <Route path="freight-rate-form" element={<ProtectedRoute><FreightRateForm /></ProtectedRoute>} />
              <Route path="freight-rate-request" element={<ProtectedRoute><FreightRateRequest /></ProtectedRoute>} />
              <Route path="freight-analysis" element={<ProtectedRoute><FreightAnalysis /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Route>

            {/* Bank Dashboard Routes */}
            <Route path="/bank-dashboard" element={<ProtectedRoute><BankDashboard /></ProtectedRoute>}>
              <Route index element={<ProtectedRoute><MainBankDashboard /></ProtectedRoute>} />
              <Route path="dashboard" element={<ProtectedRoute><MainBankDashboard /></ProtectedRoute>} />
              <Route path="freight-rate-request" element={<ProtectedRoute><BankFreightRateRequest /></ProtectedRoute>} />
              <Route path="charter-party-request" element={<ProtectedRoute><CharterPartyRequest /></ProtectedRoute>} />
              <Route path="demurrage-request" element={<ProtectedRoute><DemurrageRequest /></ProtectedRoute>} />
              <Route path="submission-request" element={<ProtectedRoute><SubmissionRequests /></ProtectedRoute>} />
              <Route path="connection-requests" element={<ProtectedRoute><ConnectionRequests /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Route>

            {/* Regulators Dashboard Routes */}
            <Route path="/regulator-dashboard" element={<ProtectedRoute><RegulatorDashboard /></ProtectedRoute>}>
              <Route index element={<ProtectedRoute><MainRegulatorDashboard /></ProtectedRoute>} />
              <Route path="dashboard" element={<ProtectedRoute><MainRegulatorDashboard /></ProtectedRoute>} />
              <Route path="freight-rate-request" element={<ProtectedRoute><RegulatorFreightRateRequest /></ProtectedRoute>} />
              <Route path="charter-party-request" element={<ProtectedRoute><RegulatorCharterPartyRequest /></ProtectedRoute>} />
              <Route path="demurrage-request" element={<ProtectedRoute><RegulatorDemurrageRequest /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Route>

            {/* Login/Reset */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster richColors position='top-center' />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;


