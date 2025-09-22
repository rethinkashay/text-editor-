import React from 'react';
import './StyleToolbar.css';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

function StyleToolbar({ selectedElement, onStyleChange }) {
  const handleFontSizeChange = (e) => {
    onStyleChange({ fontSize: parseInt(e.target.value, 10) });
  };

  const handleColorChange = (e) => {
    onStyleChange({ color: e.target.value });
  };

  
  const handleFontChange = (e) => {
    onStyleChange({ fontFamily: e.target.value });
  };

  return (
    <div className="style-toolbar">
      <div className="style-group">
        <label>Font:</label>
        
        <select
          value={selectedElement.fontFamily}
          onChange={handleFontChange}
          className="style-input font-select"
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      <div className="style-group">
        <label>Size:</label>
        <input
          type="number"
          value={selectedElement.fontSize}
          onChange={handleFontSizeChange}
          className="style-input"
        />
      </div>

      <div className="style-group">
        <button onClick={() => onStyleChange({ isBold: !selectedElement.isBold })}>
          <FaBold />
        </button>
        <button onClick={() => onStyleChange({ isItalic: !selectedElement.isItalic })}>
          <FaItalic />
        </button>
        <button onClick={() => onStyleChange({ isUnderline: !selectedElement.isUnderline })}>
          <FaUnderline />
        </button>
      </div>

      <div className="style-group">
        <label>Color:</label>
        <input
          type="color"
          value={selectedElement.color}
          onChange={handleColorChange}
          className="style-input"
        />
      </div>
    </div>
  );
}

export default StyleToolbar;