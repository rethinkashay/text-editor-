import React from 'react';
import './Header.css';
import { FaPlus, FaUndo, FaRedo } from 'react-icons/fa'; // Import icons

function Header({ onAddText, onUndo, onRedo, canUndo, canRedo }) {
  return (
    <header className="app-header">
      <h1 className="app-title">Text Editor</h1>
      <div className="header-actions">
        <button className="add-text-btn" onClick={onAddText}>
          <FaPlus /> Add Text
        </button>
        <div className="history-btns">
          <button onClick={onUndo} disabled={!canUndo}><FaUndo /></button>
          <button onClick={onRedo} disabled={!canRedo}><FaRedo /></button>
        </div>
      </div>
    </header>
  );
}

export default Header;