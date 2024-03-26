import React, { useRef, useEffect, useState } from 'react';
import './main.css';

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
  const [selectedBallIndex, setSelectedBallIndex] = useState<number | null>(null);
  const [ballsState, setBallsState] = useState<Ball[]>(balls);
  const animationIdRef = useRef<any>();

  useEffect(() => {
    setBallsState(balls);
  }, [balls]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ballsState.forEach(ball => {
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

      for (let i = 0; i < ballsState.length; i++) {
        for (let j = i + 1; j < ballsState.length; j++) {
          const dx = ballsState[j].x - ballsState[i].x;
          const dy = ballsState[j].y - ballsState[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < ballsState[i].radius + ballsState[j].radius) {
            const angle = Math.atan2(dy, dx);
            const targetX = ballsState[i].x + Math.cos(angle) * (ballsState[i].radius + ballsState[j].radius);
            const targetY = ballsState[i].y + Math.sin(angle) * (ballsState[i].radius + ballsState[j].radius);

            const ax = (targetX - ballsState[j].x) * 0.1;
            const ay = (targetY - ballsState[j].y) * 0.1;

            ballsState[i].dx -= ax;
            ballsState[i].dy -= ay;
            ballsState[j].dx += ax;
            ballsState[j].dy += ay;
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [ballsState]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedBallIndex !== null) {
      const mouseX = e.nativeEvent.offsetX;
      const mouseY = e.nativeEvent.offsetY;
      const selectedBall = ballsState[selectedBallIndex];

      const dx = mouseX - selectedBall.x;
      const dy = mouseY - selectedBall.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < selectedBall.radius) {
        const pushForce = 0.3;
        selectedBall.dx -= dx * pushForce;
        selectedBall.dy -= dy * pushForce;
      }
    }
  };

  const handleMouseUp = () => {
    setSelectedBallIndex(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const clickX = e.nativeEvent.offsetX;
    const clickY = e.nativeEvent.offsetY;

    for (let i = 0; i < ballsState.length; i++) {
      const dx = clickX - ballsState[i].x;
      const dy = clickY - ballsState[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ballsState[i].radius) {
        setSelectedBallIndex(i);
        break;
      }
    }
  };
  
  return (
    <div className='canvasDiv'>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ border: '3px solid black' }}
      />
    </div>
  );
};

export default Canvas;
