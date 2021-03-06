import React from 'react';
import './App.css';
import { Keyframe } from './components/Keyframe';
import { SideBar } from './components/SideBar';

function App() {
  return (
    <div className="flex">
      <div >
        <SideBar />
      </div>
      <Keyframe />
    </div>
  );
}

export default App;