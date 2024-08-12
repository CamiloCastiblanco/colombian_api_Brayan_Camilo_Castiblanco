import React from 'react';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PresidentsTab from './components/PresidentsTab';
import AirportsTab from './components/AirportsTab';
import AttractionsTab from './components/AttractionsTab';
function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/colombia_dash/presidents">Presidentes</Link></li>
              <li><Link to="/colombia_dash/airports">Aeropuertos</Link></li>
              <li><Link to="/colombia_dash/attractions">Atracciones Turísticas</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/colombia_dash/presidents" element={<PresidentsTab />} />
            <Route path="/colombia_dash/airports" element={<AirportsTab/>} />
            <Route path="/colombia_dash/attractions" element={<AttractionsTab/>} />
            <Route path="/colombia_dash" element={<Dashboard/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
