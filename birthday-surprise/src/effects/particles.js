// Particle Canvas Utilities
export function renderDustParticles(ctx, width, height, particles) {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.y < 0) p.y = height;
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;

    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = '#A78BFA';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

export function renderWindParticles(ctx, width, height, streaks) {
  ctx.clearRect(0, 0, width, height);
  streaks.forEach((s) => {
    s.x += s.speed;

    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#A78BFA';
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.length, s.y);
    ctx.stroke();
    ctx.restore();
  });
}

export function renderSmokeAndEmbers(ctx, width, height, smoke, embers) {
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
    e.alpha -= 0.01;

    if (e.alpha > 0) {
      ctx.save();
      ctx.globalAlpha = e.alpha;
      ctx.fillStyle = '#F59E0B';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#F59E0B';
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });
}
