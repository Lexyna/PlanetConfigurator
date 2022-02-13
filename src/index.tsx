import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { getCanvas, Renderer } from './Logic/renderer/Renderer';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

Renderer.createRenderer(getCanvas());


const editor: HTMLDivElement = document.querySelector(".editor") as HTMLDivElement;
const header: HTMLHeadElement = editor.querySelector("header") as HTMLHeadElement;

const onDrag = (e: MouseEvent) => {
  const getStyle = window.getComputedStyle(editor);
  const left = parseInt(getStyle.left);
  const top = parseInt(getStyle.top);

  editor.style.left = `${left + e.movementX}px`;
  editor.style.top = `${top + e.movementY}px`;
}

const onMouseDown = (e: MouseEvent) => {
  header.addEventListener("mousemove", onDrag)
}

header.addEventListener("mousedown", (onMouseDown))
document.addEventListener("mouseup", () => {
  header.removeEventListener("mousemove", onDrag);
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
