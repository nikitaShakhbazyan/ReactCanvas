import React from 'react';
import Canvas from './Canvas';

function App() {
  const canvasWidth = 800;
  const canvasHeight = 600;
  const balls = [
    { x: 320, y: 450, radius: 25, color: 'red', dx: 0, dy: 0 },
    { x: 432, y: 70, radius: 35, color: 'blue', dx: 0, dy: 0 },
    { x: 164, y: 420, radius: 15, color: 'green', dx: 0, dy: 0 },
  ];

  return (
    <div className="App">
      <Canvas width={canvasWidth} height={canvasHeight} balls={balls} />
    </div>
  );
}

export default App;
