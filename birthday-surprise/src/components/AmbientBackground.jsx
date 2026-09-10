import React, { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle Array Generation
    const particleCount = Math.min(Math.floor((width * height) / 12000), 120);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2 - 0.1, // Slow upward drift
      color: Math.random() > 0.4 ? '#A78BFA' : Math.random() > 0.5 ? '#F9A8D4' : '#FBBF24'
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle background star particles with mouse parallax
      particles.forEach((p) => {
        p.x += p.vx + (mouseX - width / 2) * 0.00003;
        p.y += p.vy + (mouseY - height / 2) * 0.00003;

        p.alpha += p.pulseSpeed;
        if (p.alpha > 0.9 || p.alpha < 0.2) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#08080D]">
      {/* Aurora Ambient Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full aurora-glow-1 blur-[140px] opacity-40 animate-aurora pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full aurora-glow-2 blur-[150px] opacity-35 animate-aurora pointer-events-none" style={{ animationDelay: '-7s' }} />
      <div className="absolute top-[40%] right-[20%] w-[35vw] h-[35vw] rounded-full aurora-glow-gold blur-[130px] opacity-25 animate-pulse-glow pointer-events-none" />

      {/* Canvas Floating Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40 mix-blend-overlay" />
    </div>
  );
}
