import React from 'react';
import './StatusBar.css';

function StatusBar({ elementCount, selectedElementId }) {
  return (
    <footer className="status-bar">
      <div className="status-item">
        Elements: {elementCount}
      </div>
      <div className="status-item">
        Selected: {selectedElementId || 'None'}
      </div>
    </footer>
  );
}

export default StatusBar;