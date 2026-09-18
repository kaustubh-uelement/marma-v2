"use client";

import React, { useEffect, useRef } from "react";

interface LavaItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  speed: number;
  angle: number;
  wanderAngle: number;
  wanderSpeed: number;
  baseRadius: number;
  radius: number;
  blur: number;
  minBlur: number;
  maxBlur: number;
  initialBlurDirection: number;
  colorOne: string;
  colorTwo: string;
  pulsePhase: number;
  pulseSpeed: number;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Cursor — initialised far off-screen so no repulsion on startup
    const cursor = { x: -9999, y: -9999 };

    // Repulsion tuning
    const REPULSION_RADIUS = 280;   // px around cursor that triggers push
    const REPULSION_STRENGTH = 5.5; // push force at cursor centre
    const REPULSION_FALLOFF = 2.2;  // power exponent — sharper falloff near boundary
    const RETURN_FRICTION = 0.88;   // per-frame decay so blobs drift back naturally

    // Per-floater repulsion velocity, kept separate from wander and decays each frame
    const repulseVx: number[] = [];
    const repulseVy: number[] = [];

    // STRICTLY shades of brand red, light red, crimson, pinkish-red. No orange / amber.
    const colors: [string, string][] = [
      ["rgba(216, 30, 44, 0.48)", "rgba(255, 117, 143, 0.26)"],  // Brand Red to Pinkish Red
      ["rgba(255, 30, 56, 0.46)", "rgba(255, 150, 172, 0.22)"],  // Electric True Red to Soft Pink-Red
      ["rgba(180, 20, 36, 0.42)", "rgba(255, 77, 101, 0.25)"],   // Deep Crimson to Light Red
      ["rgba(235, 45, 70, 0.46)", "rgba(255, 185, 200, 0.20)"],  // Ruby Red to Pale Rose
      ["rgba(255, 60, 85, 0.45)", "rgba(255, 130, 155, 0.24)"],  // Light Red to Pinkish Red
      ["rgba(216, 30, 44, 0.46)", "rgba(255, 90, 115, 0.22)"],   // Brand Red to Light Red
      ["rgba(240, 35, 60, 0.45)", "rgba(255, 160, 180, 0.20)"],  // Vivid Red to Pinkish Red
    ];

    const isMobile = width < 768;
    const count = isMobile ? 6 : 10;

    const items: LavaItem[] = [];

    for (let i = 0; i < count; i++) {
      let baseRadius: number;
      let speed: number;
      let blurMin = 30;
      let blurMax = 80;

      if (i < 3) {
        baseRadius = rand(220, isMobile ? 240 : 340);
        speed = rand(1.1, 1.8);
        blurMin = 60;
        blurMax = 95;
      } else if (i < 7) {
        baseRadius = rand(120, 195);
        speed = rand(1.6, 2.5);
        blurMin = 40;
        blurMax = 75;
      } else {
        baseRadius = rand(65, 110);
        speed = rand(2.2, 3.2);
        blurMin = 25;
        blurMax = 50;
      }

      const initialBlur = rand(blurMin, blurMax);
      const x = rand(-40, width + 40);
      const y = rand(-40, height + 40);
      const angle = rand(0, Math.PI * 2);
      const palette = colors[Math.floor(rand(0, colors.length))];
      const bvx = Math.cos(angle) * speed;
      const bvy = Math.sin(angle) * speed;

      items.push({
        x, y,
        vx: bvx, vy: bvy,
        baseVx: bvx, baseVy: bvy,
        speed, angle,
        wanderAngle: rand(0, Math.PI * 2),
        wanderSpeed: rand(0.03, 0.09),
        baseRadius,
        radius: baseRadius,
        blur: initialBlur,
        minBlur: blurMin,
        maxBlur: blurMax,
        initialBlurDirection: Math.random() > 0.5 ? 0.45 : -0.45,
        colorOne: palette[0],
        colorTwo: palette[1],
        pulsePhase: rand(0, Math.PI * 2),
        pulseSpeed: rand(0.012, 0.028),
      });

      repulseVx.push(0);
      repulseVy.push(0);
    }

    // Cursor / touch event listeners
    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    const onMouseLeave = () => {
      cursor.x = -9999;
      cursor.y = -9999;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      cursor.x = -9999;
      cursor.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const renderFrame = () => {
      animationFrameId = window.requestAnimationFrame(renderFrame);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // 1. Autonomous wander steering
        item.wanderAngle += item.wanderSpeed;
        const steeringForce =
          Math.sin(item.wanderAngle) * 0.08 + (Math.random() - 0.5) * 0.06;
        item.angle += steeringForce;
        item.baseVx = Math.cos(item.angle) * item.speed;
        item.baseVy = Math.sin(item.angle) * item.speed;

        // 2. Cursor repulsion force
        const dx = item.x - cursor.x;
        const dy = item.y - cursor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSION_RADIUS && dist > 0.1) {
          const nx = dx / dist;
          const ny = dy / dist;
          const t = 1 - dist / REPULSION_RADIUS;
          const force = REPULSION_STRENGTH * Math.pow(t, REPULSION_FALLOFF);
          repulseVx[i] += nx * force;
          repulseVy[i] += ny * force;
        }

        // Decay repulsion so blobs float back naturally when cursor leaves
        repulseVx[i] *= RETURN_FRICTION;
        repulseVy[i] *= RETURN_FRICTION;

        // 3. Combine wander + repulsion
        item.vx = item.baseVx + repulseVx[i];
        item.vy = item.baseVy + repulseVy[i];

        item.x += item.vx;
        item.y += item.vy;

        // 4. Soft boundary bounce
        const pad = item.radius * 0.4;
        if (item.x >= width + pad && item.vx > 0) {
          item.angle = Math.PI - item.angle + (Math.random() - 0.5) * 0.4;
          item.x = width + pad - 1;
          repulseVx[i] *= -0.4;
        } else if (item.x <= -pad && item.vx < 0) {
          item.angle = Math.PI - item.angle + (Math.random() - 0.5) * 0.4;
          item.x = -pad + 1;
          repulseVx[i] *= -0.4;
        }
        if (item.y >= height + pad && item.vy > 0) {
          item.angle = -item.angle + (Math.random() - 0.5) * 0.4;
          item.y = height + pad - 1;
          repulseVy[i] *= -0.4;
        } else if (item.y <= -pad && item.vy < 0) {
          item.angle = -item.angle + (Math.random() - 0.5) * 0.4;
          item.y = -pad + 1;
          repulseVy[i] *= -0.4;
        }

        // 5. Blur oscillation
        item.blur += item.initialBlurDirection;
        if (item.blur >= item.maxBlur) {
          item.initialBlurDirection = -Math.abs(item.initialBlurDirection);
        } else if (item.blur <= item.minBlur) {
          item.initialBlurDirection = Math.abs(item.initialBlurDirection);
        }

        // 6. Multi-harmonic radius breathing
        item.pulsePhase += item.pulseSpeed;
        item.radius =
          item.baseRadius +
          Math.sin(item.pulsePhase) * (item.baseRadius * 0.16) +
          Math.cos(item.pulsePhase * 0.7) * (item.baseRadius * 0.08);

        // 7. Draw
        ctx.beginPath();
        if (ctx.filter) {
          ctx.filter = "blur(" + Math.max(12, Math.round(item.blur)) + "px)";
        }

        const grd = ctx.createRadialGradient(
          item.x - item.radius * 0.18,
          item.y - item.radius * 0.18,
          0,
          item.x,
          item.y,
          item.radius
        );
        grd.addColorStop(0, item.colorOne);
        grd.addColorStop(0.72, item.colorTwo);
        grd.addColorStop(1, "rgba(255, 40, 65, 0)");

        ctx.fillStyle = grd;
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      if (ctx.filter) {
        ctx.filter = "none";
      }
    };

    animationFrameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="field" aria-hidden="true">
      <canvas ref={canvasRef} className="lava-canvas" />
    </div>
  );
}
