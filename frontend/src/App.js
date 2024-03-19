
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import EmployeeContent from 'components/maincontent/EmployeeContent';
import SalarySuggestion from 'components/maincontent/SalarySuggestion';
import Overview from 'components/maincontent/Overview';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <div className="col-md-9">
              <Routes>
              <Route path="/homepage" element={<Overview/>} />
                <Route path="/employees" element={<EmployeeContent/>} />
                <Route path="/salary-suggestion" element={<SalarySuggestion/>} />
                {/* Add more routes for other views */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;