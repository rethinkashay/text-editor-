import React from 'react';
import './Toolbar.css';

function Toolbar({
  onAddText,
  selectedElement,
  onStyleChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) {
  return (
    <div className="toolbar">
      <button onClick={onUndo} disabled={!canUndo}>Undo</button>
      <button onClick={onRedo} disabled={!canRedo}>Redo</button>
      
      <button onClick={onAddText}>Add Text</button>

      {selectedElement && (
        <>
          <button onClick={() => onStyleChange({ isBold: !selectedElement.isBold })}>
            Bold
          </button>
          <button onClick={() => onStyleChange({ isItalic: !selectedElement.isItalic })}>
            Italic
          </button>
        </>
      )}
    </div>
  );
}

export default Toolbar;