import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>Insurance Analytics</h2>
        </div>
        <ul className="sidebar-nav">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/data-management">Data Management</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <div className="content">
        {children}
      </div>
    </div>
  );
}
