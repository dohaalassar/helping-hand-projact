import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
         <Route element={<Layout />}>
            <Route path="/" element={<PsyPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/child/:id" element={<ChildReport />} />

         </Route>
             <Route path="/sdq/:id" element={<SDQParent />} />
            <Route path="/send-guided-message/:id" element={<SendGuidedMessage />} />
            <Route path="/schedule-session/:id" element={<ScheduleSession />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

