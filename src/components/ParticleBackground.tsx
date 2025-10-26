import React, { useEffect, useRef } from "react";

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const numParticles = 80;
    const colors = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];
    const maxLineDistance = 140;
    const glowRadius = 200; // glow detection radius

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxLineDistance) {
            // dynamic opacity based on proximity to mouse
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const distToMouse = Math.hypot(
              mouse.current.x - midX,
              mouse.current.y - midY
            );
            const glowStrength = Math.max(
              0,
              1 - distToMouse / glowRadius
            ); // fade effect near mouse

            ctx.beginPath();
            ctx.strokeStyle = `rgba(37,99,235,${0.15 + glowStrength * 0.4})`;
            ctx.lineWidth = 1 + glowStrength * 1.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // draw and move particles
      particles.forEach((p) => {
        const parallaxX = (mouse.current.x - canvas.width / 2) * 0.00015;
        const parallaxY = (mouse.current.y - canvas.height / 2) * 0.00015;

        p.x += p.dx + parallaxX;
        p.y += p.dy + parallaxY;

        // bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // glow based on proximity to mouse
        const distanceToMouse = Math.hypot(
          mouse.current.x - p.x,
          mouse.current.y - p.y
        );
        const glow = Math.max(0, 1 - distanceToMouse / glowRadius);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7 + glow * 0.3;
        ctx.shadowBlur = glow * 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.55,
        pointerEvents: "none",
        transition: "opacity 0.3s ease",
      }}
    />
  );
};

export default ParticleBackground;
