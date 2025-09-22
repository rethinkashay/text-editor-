import React, { useState } from 'react';
import './Canvas.css';

function Canvas({ textElements, onUpdateElements, selectedElementId, setSelectedElementId }) {
  const [draggedElement, setDraggedElement] = useState(null);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  
  const [editingElement, setEditingElement] = useState(null);

  const handleMouseDown = (e, element) => {
    // Don't start a drag if we're trying to edit text
    if (e.target.tagName === 'INPUT') return;
    setSelectedElementId(element.id);
    setDraggedElement(element.id);
    setInitialPosition({
      x: e.clientX - element.position.x,
      y: e.clientY - element.position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (draggedElement === null) return;
    const newElements = textElements.map(el => {
      if (el.id === draggedElement) {
        return {
          ...el,
          position: {
            x: e.clientX - initialPosition.x,
            y: e.clientY - initialPosition.y
          }
        };
      }
      return el;
    });
    onUpdateElements(newElements);
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
  };

  // --- NEW FUNCTIONS FOR EDITING ---
  const handleDoubleClick = (element) => {
    setEditingElement(element.id);
  };

  const handleTextChange = (e, elementId) => {
    const newElements = textElements.map(el => {
      if (el.id === elementId) {
        return { ...el, text: e.target.value };
      }
      return el;
    });
    onUpdateElements(newElements);
  };

  const handleInputBlur = () => {
    setEditingElement(null);
  };
  // ------------------------------------

  return (
    <div
      className="canvas"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={() => {
        setSelectedElementId(null);
        setEditingElement(null); 
      }}
    >
      {textElements.map(element => {
        const isSelected = element.id === selectedElementId;
        const isEditing = element.id === editingElement;

        return isEditing ? (
          
          <input
            key={element.id} 
            type="text"
            value={element.text}
            onChange={(e) => handleTextChange(e, element.id)}
            onBlur={handleInputBlur}
            autoFocus
            onKeyDown={(e) => { if (e.key === 'Enter') handleInputBlur() }} // Finish edit on Enter
            style={{
              position: 'absolute',
              left: `${element.position.x}px`,
              top: `${element.position.y}px`,
              fontSize: `${element.fontSize}px`,
              fontWeight: element.isBold ? 'bold' : 'normal',
              fontStyle: element.isItalic ? 'italic' : 'normal',
              textDecoration: element.isUnderline ? 'underline' : 'none',
              color: element.color,
              border: '2px dashed #007bff',
              padding: '5px',
              zIndex: 9999,
            }}
            className="text-edit-input"
          />
        ) : (
          
          <div
            key={element.id}
            className="text-element"
            style={{
              position: 'absolute',
              left: `${element.position.x}px`,
              top: `${element.position.y}px`,
              fontSize: `${element.fontSize}px`,
              fontWeight: element.isBold ? 'bold' : 'normal',
              fontStyle: element.isItalic ? 'italic' : 'normal',
              textDecoration: element.isUnderline ? 'underline' : 'none',
              color: element.color,
              fontFamily: element.fontFamily,
              cursor: 'move',
              border: isSelected ? '2px dashed #007bff' : 'none',
              padding: '5px',
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e, element);
            }}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={() => handleDoubleClick(element)}
          >
            {element.text}
          </div>
        );
      })}
    </div>
  );
}

export default Canvas;