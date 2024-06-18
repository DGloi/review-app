import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeContent from 'components/maincontent/EmployeeContent';
import SalarySuggestion from 'components/maincontent/SalarySuggestion';
import Overview from 'components/maincontent/Overview';
import Reconciliation from 'components/maincontent/Reconciliation';
import Header from 'components/Header'; 
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import 'App.css';

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <Header /> {/* Render the Header component */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12"> {/* Use col-md-12 for full width */}
                <Routes>
                  <Route path="/homepage" element={<Overview />} />
                  <Route path="/employees" element={<EmployeeContent />} />
                  <Route path="/salary-suggestion" element={<SalarySuggestion />} />
                  <Route path="/reconciliation" element={<Reconciliation />} />
                  {/* Add more routes for other views */}
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;

