import React from 'react';
import { Link } from 'react-router-dom';

function DetailsView({ match }) {
  return (
    <div className="DetailsView">
      <h1>Details</h1>
      <Link to="/">
        <span>Back</span>
      </Link>
      <h2>Story id {match.params.id}</h2>
    </div>
  );
}

export default DetailsView;
