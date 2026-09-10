import React, { useEffect, useRef } from 'react';

export default function SmokeParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;

    const centerX = width / 2;
    const centerY = height / 2 - 20;

    // Soft Gray Smoke Particles
    const smoke = Array.from({ length: 45 }, () => ({
      x: centerX + (Math.random() - 0.5) * 80,
      y: centerY + (Math.random() - 0.5) * 20,
      radius: Math.random() * 6 + 3,
      vy: Math.random() * -1.2 - 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.3,
      grow: Math.random() * 0.12 + 0.04,
    }));

    // Subtle Glowing Ember Particles
    const embers = Array.from({ length: 15 }, () => ({
      x: centerX + (Math.random() - 0.5) * 60,
      y: centerY,
      size: Math.random() * 2 + 1,
      vy: Math.random() * -1.8 - 0.6,
      vx: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.8 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Smoke
      smoke.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.radius += p.grow;
        p.alpha -= 0.005;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = '#9CA3AF';
          ctx.filter = 'blur(6px)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Render Embers
      embers.forEach((e) => {
        e.x += e.vx;
        e.y += e.vy;
        e.alpha -= 0.012;

        if (e.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = e.alpha;
          ctx.fillStyle = '#F59E0B';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#F59E0B';
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 block w-full h-full pointer-events-none z-30" />;
}
