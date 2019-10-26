import React from 'react';
import { Link } from 'react-router-dom';

function MainView() {
  return (
    <div className="MainView">
      <h1>Main</h1>
      <Link to="/details">
        <span>Details View</span>
      </Link>
    </div>
  );
}

export default MainView;
