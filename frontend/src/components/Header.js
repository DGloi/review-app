import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/homepage">
          <img src="placeholder-image-url" alt="Company Logo" width="100" height="50" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/homepage">Overview</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employees">Employees</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/salary-suggestion">Salary Suggestion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reconciliation">Reconciliation</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
