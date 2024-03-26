 interface Ball {
    x: number;
    y: number;
    radius: number;
    color: string;
    dx: number;
    dy: number;
  }

export interface CanvasProps {
  width: number;
  height: number;
  balls: Ball[];
  setBalls: React.Dispatch<React.SetStateAction<Ball[]>>;
}