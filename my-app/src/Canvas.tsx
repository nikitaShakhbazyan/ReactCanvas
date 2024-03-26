import React, { useRef, useEffect } from 'react';
import './main.css';
import {CanvasProps } from './types';

const Canvas: React.FC<CanvasProps> = ({ width, height, balls, setBalls }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

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

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [balls]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const clickX = e.nativeEvent.offsetX;
    const clickY = e.nativeEvent.offsetY;

    const updatedBalls = balls.map(ball => {
      const dx = clickX - ball.x;
      const dy = clickY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ball.radius) {
        if (ball.color === 'white') {
          const invertedDx = ball.dx * 30;
          const invertedDy = ball.dy * 30;
          return { ...ball, dx: invertedDx, dy: invertedDy };
        } else {
          const newColor = prompt('Enter new color:', ball.color);
          if (newColor) {
            return { ...ball, color: newColor };
          }
        }
      }
      return ball;
    });

    setBalls(updatedBalls);
  };

  return (
    <div className='canvasDiv'>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        style={{ border: '3px solid black' }}
      />
    </div>
  );
};

export default Canvas;
