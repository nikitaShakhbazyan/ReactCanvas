import React from 'react';
import Canvas from './Canvas';
import './main.css';

function App() {
  const canvasWidth = 1200;
  const canvasHeight = 500;
  const radius = 30;

  const whiteBall = {
    x: canvasWidth - 100,
    y: canvasHeight / 2,
    radius: radius,
    color: 'white',
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
  };

  const triangleBalls = [
    { x: 100, y: canvasHeight / 2, radius: radius, color: 'rgb(255, 0, 0)', dx: 0, dy: 0 },
    { x: 100 + radius * 2, y: canvasHeight / 2 - radius, radius: radius, color: 'rgb(0, 255, 0)', dx: 0, dy: 0 },
    { x: 100 + radius * 2, y: canvasHeight / 2 + radius, radius: radius, color: 'rgb(0, 0, 255)', dx: 0, dy: 0 },
  ];

  return (
    <div className="App">
      <h1>Pool!</h1>
      <Canvas width={canvasWidth} height={canvasHeight} balls={[whiteBall, ...triangleBalls]} />
    </div>
  );
}

export default App;
