"use client";

import { useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface BrightStar extends Star {
  glowRadius: number;
  flashTimer: number;
  flashDuration: number;
  isFlashing: boolean;
}

interface Nebula {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  colorInner: string;
  colorOuter: string;
  opacity: number;
  driftX: number;
  driftY: number;
  rotation: number;
  rotationSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
  width: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const BG_COLOR = "#0A0A0B";
const GOLD_RGB = "212, 168, 83";

const DISTANT_STAR_COUNT = 250;
const MID_STAR_COUNT = 90;
const BRIGHT_STAR_COUNT = 18;
const NEBULA_COUNT = 4;

const SHOOTING_STAR_MIN_INTERVAL = 3000;
const SHOOTING_STAR_MAX_INTERVAL = 8000;

// ─── Helpers (pure functions, module-level) ──────────────────────────────────

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createDistantStar(w: number, h: number): Star {
  const isWarm = Math.random() < 0.3;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    radius: rand(0.3, 1),
    baseOpacity: rand(0.15, 0.45),
    twinkleSpeed: rand(0.0003, 0.001),
    twinkleOffset: rand(0, Math.PI * 2),
    color: isWarm ? "rgba(255, 240, 210" : "rgba(255, 255, 255",
  };
}

function createMidStar(w: number, h: number): Star {
  const isGold = Math.random() < 0.25;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    radius: rand(1, 2),
    baseOpacity: rand(0.4, 0.75),
    twinkleSpeed: rand(0.001, 0.003),
    twinkleOffset: rand(0, Math.PI * 2),
    color: isGold ? `rgba(${GOLD_RGB}` : "rgba(255, 248, 240",
  };
}

function createBrightStar(w: number, h: number): BrightStar {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    radius: rand(2, 3),
    baseOpacity: rand(0.7, 1),
    twinkleSpeed: rand(0.0008, 0.002),
    twinkleOffset: rand(0, Math.PI * 2),
    color: `rgba(${GOLD_RGB}`,
    glowRadius: rand(8, 18),
    flashTimer: rand(5000, 15000),
    flashDuration: rand(400, 800),
    isFlashing: false,
  };
}

function createNebula(w: number, h: number, index: number): Nebula {
  const colors = [
    { inner: "80, 40, 120", outer: "40, 20, 80" },
    { inner: "30, 50, 100", outer: "15, 25, 60" },
    { inner: "60, 30, 90", outer: "30, 15, 50" },
    { inner: GOLD_RGB, outer: "100, 70, 20" },
  ];
  const c = colors[index % colors.length];
  return {
    x: rand(w * 0.1, w * 0.9),
    y: rand(h * 0.1, h * 0.9),
    radiusX: rand(w * 0.15, w * 0.35),
    radiusY: rand(h * 0.12, h * 0.3),
    colorInner: c.inner,
    colorOuter: c.outer,
    opacity: rand(0.02, 0.04),
    driftX: rand(-0.00003, 0.00003),
    driftY: rand(-0.00003, 0.00003),
    rotation: rand(0, Math.PI * 2),
    rotationSpeed: rand(-0.00001, 0.00001),
  };
}

function createShootingStar(w: number, h: number): ShootingStar {
  return {
    x: rand(-w * 0.1, w * 1.1),
    y: rand(-h * 0.1, h * 0.3),
    length: rand(80, 200),
    speed: rand(6, 12),
    angle: rand(Math.PI * 0.1, Math.PI * 0.4),
    opacity: 1,
    life: 0,
    maxLife: rand(60, 120),
    width: rand(1, 2),
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas = canvasEl as HTMLCanvasElement;

    // ── State ──────────────────────────────────────────────────────────────

    let animFrameId = 0;
    let stars: Star[] = [];
    let midStars: Star[] = [];
    let brightStars: BrightStar[] = [];
    let nebulae: Nebula[] = [];
    let shootingStar: ShootingStar | null = null;
    let nextShootingTime = 0;
    let reducedMotion = false;
    let prevTime = 0;
    let viewW = 0;
    let viewH = 0;

    // ── Init ───────────────────────────────────────────────────────────────

    function initScene(w: number, h: number) {
      viewW = w;
      viewH = h;
      stars = Array.from({ length: DISTANT_STAR_COUNT }, () =>
        createDistantStar(w, h)
      );
      midStars = Array.from({ length: MID_STAR_COUNT }, () =>
        createMidStar(w, h)
      );
      brightStars = Array.from({ length: BRIGHT_STAR_COUNT }, () =>
        createBrightStar(w, h)
      );
      nebulae = Array.from({ length: NEBULA_COUNT }, (_, i) =>
        createNebula(w, h, i)
      );
    }

    // ── Draw layers ────────────────────────────────────────────────────────

    function drawNebulae(ctx: CanvasRenderingContext2D, time: number) {
      for (const n of nebulae) {
        const dx = n.x + Math.sin(time * n.driftX * 100) * 20;
        const dy = n.y + Math.cos(time * n.driftY * 100) * 15;
        const rot = n.rotation + time * n.rotationSpeed;

        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(rot);
        ctx.scale(1, n.radiusY / n.radiusX);

        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, n.radiusX);
        g.addColorStop(0, `rgba(${n.colorInner}, ${n.opacity})`);
        g.addColorStop(0.5, `rgba(${n.colorOuter}, ${n.opacity * 0.5})`);
        g.addColorStop(1, `rgba(${n.colorOuter}, 0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, n.radiusX, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawDistantStars(ctx: CanvasRenderingContext2D, time: number) {
      for (const s of stars) {
        const twinkle =
          s.baseOpacity +
          Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.15;
        const opacity = Math.max(0.05, Math.min(1, twinkle));
        ctx.fillStyle = `${s.color}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawMidStars(ctx: CanvasRenderingContext2D, time: number) {
      for (const s of midStars) {
        const twinkle =
          s.baseOpacity +
          Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.2;
        const opacity = Math.max(0.1, Math.min(1, twinkle));

        ctx.fillStyle = `${s.color}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        if (opacity > 0.5) {
          const glow = ctx.createRadialGradient(
            s.x, s.y, 0,
            s.x, s.y, s.radius * 3
          );
          glow.addColorStop(0, `${s.color}, ${opacity * 0.3})`);
          glow.addColorStop(1, `${s.color}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawBrightStarsLayer(
      ctx: CanvasRenderingContext2D,
      time: number,
      dt: number
    ) {
      for (const s of brightStars) {
        // Flash logic
        s.flashTimer -= dt;
        if (s.flashTimer <= 0 && !s.isFlashing) {
          s.isFlashing = true;
          s.flashTimer = s.flashDuration;
        }
        if (s.isFlashing) {
          s.flashTimer -= dt;
          if (s.flashTimer <= 0) {
            s.isFlashing = false;
            s.flashTimer = rand(5000, 15000);
          }
        }

        const twinkle =
          s.baseOpacity +
          Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.15;
        const flashBoost = s.isFlashing
          ? 0.5 * (s.flashTimer / s.flashDuration)
          : 0;
        const opacity = Math.max(0.3, Math.min(1, twinkle + flashBoost));

        const glowSize = s.glowRadius * (1 + flashBoost * 0.8);

        // Outer glow
        const outerGlow = ctx.createRadialGradient(
          s.x, s.y, 0,
          s.x, s.y, glowSize
        );
        outerGlow.addColorStop(0, `rgba(${GOLD_RGB}, ${opacity * 0.35})`);
        outerGlow.addColorStop(0.4, `rgba(${GOLD_RGB}, ${opacity * 0.1})`);
        outerGlow.addColorStop(1, `rgba(${GOLD_RGB}, 0)`);
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Cross sparkle
        const lineLen = glowSize * (0.6 + flashBoost * 0.5);
        const lineOp = opacity * 0.25;
        ctx.strokeStyle = `rgba(${GOLD_RGB}, ${lineOp})`;
        ctx.lineWidth = 0.5 + flashBoost * 0.5;

        ctx.beginPath();
        ctx.moveTo(s.x - lineLen, s.y);
        ctx.lineTo(s.x + lineLen, s.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(s.x, s.y - lineLen);
        ctx.lineTo(s.x, s.y + lineLen);
        ctx.stroke();

        // Diagonal sparkle
        const diagLen = lineLen * 0.5;
        ctx.strokeStyle = `rgba(${GOLD_RGB}, ${lineOp * 0.5})`;
        ctx.lineWidth = 0.3;

        ctx.beginPath();
        ctx.moveTo(s.x - diagLen, s.y - diagLen);
        ctx.lineTo(s.x + diagLen, s.y + diagLen);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(s.x + diagLen, s.y - diagLen);
        ctx.lineTo(s.x - diagLen, s.y + diagLen);
        ctx.stroke();

        // Core dot
        ctx.fillStyle = `rgba(255, 250, 240, ${opacity})`;
        ctx.beginPath();
        ctx.arc(
          s.x,
          s.y,
          s.radius * (1 + flashBoost * 0.3),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    function updateAndDrawShootingStar(ctx: CanvasRenderingContext2D) {
      if (!shootingStar) return;

      const ss = shootingStar;
      const tailX = ss.x - Math.cos(ss.angle) * ss.length;
      const tailY = ss.y - Math.sin(ss.angle) * ss.length;

      const lifeRatio = ss.life / ss.maxLife;
      const fadeIn = Math.min(1, lifeRatio * 5);
      const fadeOut = Math.max(0, 1 - (lifeRatio - 0.6) * 2.5);
      ss.opacity = fadeIn * fadeOut;

      if (ss.opacity <= 0) {
        shootingStar = null;
        return;
      }

      // Tail gradient
      const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      gradient.addColorStop(0, `rgba(${GOLD_RGB}, 0)`);
      gradient.addColorStop(0.7, `rgba(${GOLD_RGB}, ${ss.opacity * 0.4})`);
      gradient.addColorStop(1, `rgba(255, 250, 240, ${ss.opacity * 0.9})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = ss.width;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.stroke();

      // Head glow
      const headGlow = ctx.createRadialGradient(
        ss.x, ss.y, 0,
        ss.x, ss.y, 4
      );
      headGlow.addColorStop(0, `rgba(255, 250, 240, ${ss.opacity * 0.8})`);
      headGlow.addColorStop(1, `rgba(${GOLD_RGB}, 0)`);
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Advance position
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.life++;
    }

    // ── Main draw loop ─────────────────────────────────────────────────────

    function draw(timestamp: number) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dt = timestamp - prevTime;
      prevTime = timestamp;

      // Clear
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, viewW, viewH);

      if (reducedMotion) {
        drawNebulae(ctx, 0);
        drawDistantStars(ctx, 0);
        drawMidStars(ctx, 0);
        drawBrightStarsLayer(ctx, 0, 0);
        return; // No animation loop
      }

      drawNebulae(ctx, timestamp);
      drawDistantStars(ctx, timestamp);
      drawMidStars(ctx, timestamp);
      drawBrightStarsLayer(ctx, timestamp, dt);

      // Shooting star spawning
      if (!shootingStar && timestamp > nextShootingTime) {
        shootingStar = createShootingStar(viewW, viewH);
        nextShootingTime =
          timestamp +
          rand(SHOOTING_STAR_MIN_INTERVAL, SHOOTING_STAR_MAX_INTERVAL);
      }

      updateAndDrawShootingStar(ctx);

      animFrameId = requestAnimationFrame(draw);
    }

    // ── Resize ─────────────────────────────────────────────────────────────

    function handleResize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      initScene(w, h);
    }

    // ── Reduced motion ─────────────────────────────────────────────────────

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = motionQuery.matches;

    function handleMotionChange(e: MediaQueryListEvent) {
      reducedMotion = e.matches;
      if (reducedMotion) {
        cancelAnimationFrame(animFrameId);
        // Render one static frame
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = BG_COLOR;
          ctx.fillRect(0, 0, viewW, viewH);
          drawNebulae(ctx, 0);
          drawDistantStars(ctx, 0);
          drawMidStars(ctx, 0);
          drawBrightStarsLayer(ctx, 0, 0);
        }
      } else {
        prevTime = performance.now();
        nextShootingTime =
          performance.now() +
          rand(SHOOTING_STAR_MIN_INTERVAL, SHOOTING_STAR_MAX_INTERVAL);
        animFrameId = requestAnimationFrame(draw);
      }
    }
    motionQuery.addEventListener("change", handleMotionChange);

    // ── Bootstrap ──────────────────────────────────────────────────────────

    handleResize();

    nextShootingTime =
      performance.now() + rand(SHOOTING_STAR_MIN_INTERVAL, SHOOTING_STAR_MAX_INTERVAL);
    prevTime = performance.now();

    if (reducedMotion) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, viewW, viewH);
        drawNebulae(ctx, 0);
        drawDistantStars(ctx, 0);
        drawMidStars(ctx, 0);
        drawBrightStarsLayer(ctx, 0, 0);
      }
    } else {
      animFrameId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", handleResize);

    // ── Cleanup ────────────────────────────────────────────────────────────

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
