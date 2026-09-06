import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  driftX: number;
  driftY: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

interface AmbientStarfieldProps {
  intensity?: number; // 0 (dim/dark) to 1 (full galaxy)
  speedMultiplier?: number;
}

export const AmbientStarfield: React.FC<AmbientStarfieldProps> = ({
  intensity = 1,
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const starCount = Math.floor((width * height) / 4500);
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    const starColors = [
      '#FFFFFF',
      '#FDF4FF', // soft pink
      '#EDE9FE', // soft purple
      '#FEF3C7', // soft gold
      '#E0F2FE', // soft cyan
    ];

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.4,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          driftX: (Math.random() - 0.5) * 0.15,
          driftY: (Math.random() - 0.5) * 0.15,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    initStars();

    const spawnShootingStar = () => {
      if (Math.random() < 0.02 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 1,
          active: true,
        });
      }
    };

    let time = 0;

    const render = () => {
      time += 0.016 * speedMultiplier;
      ctx.clearRect(0, 0, width, height);

      // Deep space base gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.1,
        width / 2,
        height / 2,
        width * 0.8
      );
      bgGrad.addColorStop(0, '#0a0a14');
      bgGrad.addColorStop(0.6, '#06060c');
      bgGrad.addColorStop(1, '#020205');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Cosmic Nebula clouds
      if (intensity > 0.1) {
        const nebulaGrad1 = ctx.createRadialGradient(
          width * 0.3 + Math.sin(time * 0.2) * 50,
          height * 0.4 + Math.cos(time * 0.2) * 40,
          10,
          width * 0.3,
          height * 0.4,
          width * 0.45
        );
        nebulaGrad1.addColorStop(0, `rgba(167, 139, 250, ${0.06 * intensity})`);
        nebulaGrad1.addColorStop(0.5, `rgba(249, 168, 212, ${0.03 * intensity})`);
        nebulaGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nebulaGrad1;
        ctx.fillRect(0, 0, width, height);

        const nebulaGrad2 = ctx.createRadialGradient(
          width * 0.7 + Math.cos(time * 0.15) * 60,
          height * 0.65 + Math.sin(time * 0.15) * 50,
          20,
          width * 0.7,
          height * 0.65,
          width * 0.5
        );
        nebulaGrad2.addColorStop(0, `rgba(251, 191, 36, ${0.04 * intensity})`);
        nebulaGrad2.addColorStop(0.6, `rgba(139, 92, 246, ${0.03 * intensity})`);
        nebulaGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nebulaGrad2;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw Twinkling Stars
      for (const s of stars) {
        s.x += s.driftX * speedMultiplier;
        s.y += s.driftY * speedMultiplier;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const currentAlpha =
          (Math.sin(time * s.twinkleSpeed * 60 + s.x) * 0.35 + 0.65) *
          s.alpha *
          intensity;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra soft glow for larger stars
        if (s.size > 1.4 && intensity > 0.3) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = s.color;
          ctx.fill();
        }
        ctx.restore();
      }

      // Spawn and draw Shooting Stars
      if (intensity > 0.3) {
        spawnShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const dx = Math.cos(ss.angle) * ss.speed * speedMultiplier;
        const dy = Math.sin(ss.angle) * ss.speed * speedMultiplier;

        ss.x += dx;
        ss.y += dy;
        ss.opacity -= 0.015 * speedMultiplier;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${ss.opacity * intensity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - Math.cos(ss.angle) * ss.length,
          ss.y - Math.sin(ss.angle) * ss.length
        );
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full transition-opacity duration-1000"
      style={{ opacity: intensity > 0.05 ? 1 : 0.2 }}
    />
  );
};
