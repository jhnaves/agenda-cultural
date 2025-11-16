import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UpcomingEvents from './pages/UpcomingEvents';
import PastEvents from './pages/PastEvents';
import EventDetail from './pages/EventDetail';
import About from './pages/About';
import SubmitEvent from './pages/SubmitEvent';
import { ThemeProvider } from './context/ThemeContext';

function App(): React.ReactElement {
  return (
    <ThemeProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<UpcomingEvents />} />
            <Route path="/eventos-passados" element={<PastEvents />} />
            <Route path="/evento/:id" element={<EventDetail />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/cadastrar-evento" element={<SubmitEvent />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
