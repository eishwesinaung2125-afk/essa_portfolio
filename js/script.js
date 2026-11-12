// Update the footer year automatically.
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Add a subtle shadow to the navigation bar after scrolling.
const navbar = document.querySelector('.navbar');
const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// Close the mobile navigation after a section link is selected.
document.querySelectorAll('.navbar .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.querySelector('.navbar-collapse');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});


// Sakura Matrix: softly falling cherry-blossom petals across the page.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'sakura-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0, height = 0, petals = [], animationId;
  const colors = ['#f7b8cb', '#f4c5d4', '#ffd8e4', '#eaa2bd', '#fff0f5'];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(65, Math.max(24, Math.floor(width / 20)));
    petals = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      size: 3 + Math.random() * 5,
      speed: 0.55 + Math.random() * 1.15,
      drift: -0.45 + Math.random() * 0.9,
      sway: Math.random() * Math.PI * 2,
      spin: -0.025 + Math.random() * 0.05,
      rotation: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: Math.random() > 0.72
    }));
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.72;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 1.05, -p.size * 0.8, p.size * 1.25, p.size * 0.45, 0, p.size);
    ctx.bezierCurveTo(-p.size * 1.25, p.size * 0.45, -p.size * 1.05, -p.size * 0.8, 0, -p.size);
    ctx.fill();
    if (p.trail) {
      ctx.strokeStyle = 'rgba(231, 151, 181, .32)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.65);
      ctx.lineTo(0, p.size * 0.65);
      ctx.stroke();
    }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const p of petals) {
      p.sway += 0.012;
      p.x += p.drift + Math.sin(p.sway) * 0.55;
      p.y += p.speed;
      p.rotation += p.spin;
      if (p.y > height + 15) { p.y = -15; p.x = Math.random() * width; }
      if (p.x < -20) p.x = width + 15;
      if (p.x > width + 20) p.x = -15;
      drawPetal(p);
    }
    animationId = requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animationId);
    else animate();
  });
})();
