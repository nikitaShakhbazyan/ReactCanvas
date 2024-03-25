import React, { useRef, useEffect, useState } from 'react';

interface Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
}

interface CanvasProps {
  width: number;
  height: number;
  balls: Ball[];
}

const Canvas: React.FC<CanvasProps> = ({ width, height, balls }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () : number => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach(({ x, y, radius, color }) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      if (mousePos) {
        balls.forEach((ball, index) => {
          const dx = mousePos.x - ball.x;
          const dy = mousePos.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < ball.radius) {
            balls[index] = {
              ...ball,
              x: ball.x + dx * 0.9, 
              y: ball.y + dy * 0.9,
            };
          }
        });
      }

      return requestAnimationFrame(animate);
    };

    const animationId = animate();

    return () => cancelAnimationFrame(animationId);
  }, [balls, mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setMousePos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleMouseUp = () => {
    setMousePos(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const newBall = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      radius: Math.random() * 20 + 10,
      color: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
    };
    balls.push(newBall);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Canvas;
