import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="col-md-3">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <ul className="navbar-nav flex-column">
            <li className="nav-item">
                <Link className="nav-link" to="/homepage">Overview</Link>
            </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employees">Employees</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/salary-suggestion">Salary Suggestion</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;