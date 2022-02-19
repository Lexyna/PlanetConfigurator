import React from 'react';
import './App.css';
import { Keyframe } from './components/Keyframe';
import { Setting } from './components/Settings';

function App() {
  return (
    <div>
      <div className="editor">
        <header>PlanetProperties</header>
        < Setting />
      </div>
      <Keyframe />
    </div>
  );
}

export default App;
