import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './PageNotFound.scss';

export default () => {
  return (
    <div className="page markdown">
      <h1>Page Not Found</h1>
      <p>Oops! The page you are looking for has been removed or relocated.</p>
      <div className="button">
        <Link to="/">Go to Homepage</Link>
      </div>
    </div>
  );
};
