import React, { useRef, useEffect, useState } from 'react';

interface Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  dx: number;
  dy: number;
}

interface CanvasProps {
  width: number;
  height: number;
  balls: Ball[];
}

const Canvas: React.FC<CanvasProps> = ({ width, height, balls }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const animationIdRef = useRef<any>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        ball.dx *= 0.99;
        ball.dy *= 0.99;
        
        if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
          ball.dx *= -1;
        }
        if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
          ball.dy *= -1;
        }

        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const dx = balls[j].x - balls[i].x;
          const dy = balls[j].y - balls[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < balls[i].radius + balls[j].radius) {
            const angle = Math.atan2(dy, dx);
            const targetX = balls[i].x + Math.cos(angle) * (balls[i].radius + balls[j].radius);
            const targetY = balls[i].y + Math.sin(angle) * (balls[i].radius + balls[j].radius);

            const ax = (targetX - balls[j].x) * 0.1;
            const ay = (targetY - balls[j].y) * 0.1;

            balls[i].dx -= ax;
            balls[i].dy -= ay;
            balls[j].dx += ax;
            balls[j].dy += ay;
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [balls]);

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
      dx: Math.random() * 4 - 2,
      dy: Math.random() * 4 - 2,
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
