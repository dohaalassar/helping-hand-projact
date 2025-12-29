import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Public
import LandingPage from "./LandingPage";
import AuthPage from "./AuthPage";

// Parent
import ParentDashboard from "./ParentDashboard";
import ParentSettings from "./ParentSettings";
import ChildDetails from "./ChildDetails";

// Psychologist
import Layout from "./components/Layout";
import PsyPage from "./PsyPage";
import CasesPage from "./CasesPage";
import Settings from "./Settings";
import ChildReport from "./ChildReport";
import SDQParent from "./SDQParent";
import ScheduleSession from "./ScheduleSession";
import SendGuidedMessage from "./SendGuidedMessage";

// Admin
import AdminPortal from "./AdminPortal";
import AdminDashboard from "./AdminDashboard";
import AdminSettings from "./AdminSettings";
import AdminView from "./AdminView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Parent */}
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/settings" element={<ParentSettings />} />
        <Route path="/parent/child/:id" element={<ChildDetails />} />

        {/* Psychologist (Inside Layout) */}
        <Route element={<Layout />}>
          <Route path="/psy/dashboard" element={<PsyPage />} />
          <Route path="/psy/cases" element={<CasesPage />} />
          <Route path="/psy/settings" element={<Settings />} />
          <Route path="/psy/child/:id" element={<ChildReport />} />
        </Route>

        {/* Psychologist (Outside Layout) */}
        <Route path="/psy/sdq/:id" element={<SDQParent />} />
        <Route path="/psy/send-guided-message/:id" element={<SendGuidedMessage />} />
        <Route path="/psy/schedule-session/:id" element={<ScheduleSession />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminPortal />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/view" element={<AdminView />} />
        <Route path="/admin/portal" element={<Navigate to="/admin/login" replace />} />

        {/* Compatibility */}
        <Route path="/login" element={<Navigate to="/auth" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

