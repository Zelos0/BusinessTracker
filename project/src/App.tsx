import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Protocols from './pages/Protocols';
import Budget from './pages/Budget';
import Scheduling from './pages/Scheduling';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="protocols" element={<Protocols />} />
          <Route path="budget" element={<Budget />} />
          <Route path="scheduling" element={<Scheduling />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;