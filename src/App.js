import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import StyleToolbar from './components/StyleToolbar/StyleToolbar.js';
import Canvas from './components/Canvas/Canvas.js';
import StatusBar from './components/StatusBar/StatusBar.js';


function App() {
  const [history, setHistory] = useState([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const textElements = history[historyStep];

  const handleStateUpdate = (newElements) => {
    const newHistory = history.slice(0, historyStep + 1);
    setHistory([...newHistory, newElements]);
    setHistoryStep(newHistory.length);
  };

  const [selectedElementId, setSelectedElementId] = useState(null);
  const selectedElement = textElements.find(el => el.id === selectedElementId);

  const addTextElement = () => {
    const newTextElement = {
      id: Date.now(),
      text: 'New Text',
      position: { x: 50, y: 50 },
      fontSize: 16,
      isBold: false,
      isItalic: false,
      isUnderline: false,
      color: '#000000',
      fontFamily: 'Arial',
    };
    handleStateUpdate([...textElements, newTextElement]);
  };

  const updateElementStyle = (styleChanges) => {
    const newElements = textElements.map(el => {
      if (el.id === selectedElementId) {
        return { ...el, ...styleChanges };
      }
      return el;
    });
    handleStateUpdate(newElements);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setSelectedElementId(null);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      setSelectedElementId(null);
    }
  };

   return (
    <div className="App">
      <Header
        onAddText={addTextElement}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyStep > 0}
        canRedo={historyStep < history.length - 1}
      />

      <Canvas
        textElements={textElements}
        onUpdateElements={handleStateUpdate}
        selectedElementId={selectedElementId}
        setSelectedElementId={setSelectedElementId}
      />
      {selectedElement && (
        <StyleToolbar
          selectedElement={selectedElement}
          onStyleChange={updateElementStyle}
        />
      )}

      <StatusBar
        elementCount={textElements.length}
        selectedElementId={selectedElementId}
      />
    </div>
  );
}
export default App;
