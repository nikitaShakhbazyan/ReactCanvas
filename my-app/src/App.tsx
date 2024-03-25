import React from 'react';
import Canvas from './Canvas';

function App() {
  const canvasWidth = 500;
  const canvasHeight = 700;
  const balls = [
    { x: 320, y: 450, radius: 25, color: 'red' },
    { x: 432, y: 70, radius: 35, color: 'blue' },
    { x: 164, y: 420, radius: 15, color: 'green' },
  ];

  return (
    <div className="App">
      <h1>Hi guys</h1>
      <Canvas width={canvasWidth} height={canvasHeight} balls={balls} />
    </div>
  );
}

export default App;
