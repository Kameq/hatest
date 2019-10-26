import React from 'react';
import { Link } from 'react-router-dom';

function DetailsView() {
  return (
    <div className="DetailsView">
      <h1>Details</h1>
      <Link to="/">
        <span>Back</span>
      </Link>
    </div>
  );
}

export default DetailsView;
