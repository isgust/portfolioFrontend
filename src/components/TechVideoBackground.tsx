import { useEffect, useRef } from "react";

interface TechVideoBackgroundProps {
  type?: "hero" | "sobre" | "skills" | "experiencia" | "projetos" | "contato";
}

const TechVideoBackground = ({ type = "hero" }: TechVideoBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Color definitions based on system palette (Primary red #e53e3e, Accent orange #f6ad55)
    const primaryColor = type === "sobre" || type === "experiencia" ? "246, 173, 85" : "229, 62, 62";
    const accentColor = "246, 173, 85";

    // 1. Hero: Matrix Data Stream / Glowing Code Particles
    if (type === "hero") {
      const columns = Math.floor(width / 20);
      const drops: number[] = Array(columns).fill(1);
      const charSet = "0110100101JAVA_SPRING_REACT_UFMA_010101";

      const drawMatrix = () => {
        ctx.fillStyle = "rgba(18, 18, 18, 0.15)";
        ctx.fillRect(0, 0, width, height);

        ctx.font = "12px 'Poppins', monospace";

        for (let i = 0; i < drops.length; i++) {
          const text = charSet[Math.floor(Math.random() * charSet.length)];
          const alpha = Math.random() * 0.8 + 0.2;
          ctx.fillStyle = i % 3 === 0 ? `rgba(${primaryColor}, ${alpha})` : `rgba(${accentColor}, ${alpha * 0.7})`;

          ctx.fillText(text, i * 20, drops[i] * 20);

          if (drops[i] * 20 > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        animationFrameId = requestAnimationFrame(drawMatrix);
      };
      drawMatrix();
    }

    // 2. Sobre: Neural Connected Nodes / Cyber Constellation
    else if (type === "sobre" || type === "experiencia") {
      const particleCount = 45;
      const particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
      }));

      const drawNodes = () => {
        ctx.fillStyle = "rgba(14, 14, 14, 0.2)";
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${primaryColor}, 0.8)`;
          ctx.fill();

          for (let j = i + 1; j < particleCount; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${primaryColor}, ${1 - dist / 90 * 0.4})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
        animationFrameId = requestAnimationFrame(drawNodes);
      };
      drawNodes();
    }

    // 3. Skills / Projetos / Contato: Cyber Grid & Pulsing Neon Waves
    else {
      let step = 0;
      const drawGrid = () => {
        ctx.fillStyle = "rgba(10, 10, 10, 0.25)";
        ctx.fillRect(0, 0, width, height);

        step += 0.02;

        // Grid lines
        ctx.strokeStyle = `rgba(${primaryColor}, 0.08)`;
        ctx.lineWidth = 1;
        const gridSize = 40;

        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Glowing pulsing circle
        const radius = Math.sin(step) * 40 + 120;
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          10,
          width / 2,
          height / 2,
          radius
        );
        gradient.addColorStop(0, `rgba(${primaryColor}, 0.25)`);
        gradient.addColorStop(0.5, `rgba(${accentColor}, 0.1)`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
        ctx.fill();

        animationFrameId = requestAnimationFrame(drawGrid);
      };
      drawGrid();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl md:rounded-3xl">
      <canvas ref={canvasRef} className="w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90" />
    </div>
  );
};

export default TechVideoBackground;
