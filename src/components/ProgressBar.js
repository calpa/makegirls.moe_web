import React from 'react';

const ProgressBar = ({ value }) => (
  <div className="progress" style={{ marginBottom: 10 }}>
    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100" style={{ width: `${value}%` }}>
      <span className="sr-only">{value}% Complete</span>
    </div>
  </div>
);

export default ProgressBar;
