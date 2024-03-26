import React from 'react';
import Canvas from './Canvas';
import './main.css'
function App() {
  const canvasWidth = 1200;
  const canvasHeight = 500;
  const radius = 50;

  const balls = Array.from({ length: 8 }, () => ({
    x: Math.random() * (canvasWidth - 2 * radius) + radius,
    y: Math.random() * (canvasHeight - 2 * radius) + radius,
    radius: Math.random() * 20 + 20,
    color: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
  }));

  return (
    <div className="App">
      <h1>Pool!</h1>
      <Canvas width={canvasWidth} height={canvasHeight} balls={balls} />
    </div>
  );
}

export default App;
