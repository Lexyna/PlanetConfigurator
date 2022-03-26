import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { Animator } from './Logic/renderer/Animator';
import { getCanvas, Renderer } from './Logic/renderer/Renderer';
import reportWebVitals from './reportWebVitals';
import { initObservers } from './store/observers';
import { store } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

initObservers();

Renderer.createRenderer(getCanvas("rootCanvas"));

Animator.createAnimator();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
