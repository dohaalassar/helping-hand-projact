import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PsyPage from './PsyPage';
import CasesPage from './CasesPage';
import Settings from './Settings'; 
import SDQParent from './SDQParent';
import ChildReport from './ChildReport';
import ScheduleSession from './ScheduleSession';
import SendGuidedMessage from './SendGuidedMessage';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PsyPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/sdq/:id" element={<SDQParent />} />
        <Route path="/child/:id" element={<ChildReport />} />
        <Route path="/send-guided-message" element={<SendGuidedMessage />} />
        <Route path="/schedule-session" element={<ScheduleSession />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

