import './tailwind.css';
import 'editor/dist/index.css';
import { SpecEditor, useSpecStore } from 'editor';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

declare const acquireVsCodeApi: () => any;
const vscode = acquireVsCodeApi();

const App = () => {
  const setSpec = useSpecStore((state) => state.setSpec);
  const spec = useSpecStore((state) => state.spec);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message.type === 'loadSpec') {
        setSpec(message.spec);
      }
    });

    vscode.postMessage({ type: 'init' });
  }, []);

  useEffect(() => {
    vscode.postMessage({ type: 'updateSpec', spec });
  }, [spec]);

  return <SpecEditor />;
};

ReactDOM.render(<App />, document.getElementById('root'));
