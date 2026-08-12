"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "approach" | "cross" | "redirect" | "counter" | "shatter" | "settle";

const TOTAL_DURATION = 3600;

const phaseCopy: Record<Phase, { label: string; title: string }> = {
  idle: { label: "단일 타격 접근 전", title: "접촉 대기" },
  approach: { label: "직선 타격 접근", title: "힘을 받는다" },
  cross: { label: "양류 교차", title: "두 팔의 원을 닫는다" },
  redirect: { label: "원형 궤도 유도", title: "힘의 중심을 비운다" },
  counter: { label: "반류 압축", title: "빈 곳으로 돌려준다" },
  shatter: { label: "쇄경 충돌", title: "암반 파쇄" },
  settle: { label: "잔류 수류 회수", title: "반격 완료" },
};

const phaseIndex: Record<Phase, number> = {
  idle: -1,
  approach: 0,
  cross: 1,
  redirect: 2,
  counter: 3,
  shatter: 3,
  settle: 3,
};

type Point = { x: number; y: number };

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOut(value: number) {
  return 1 - Math.pow(1 - clamp(value), 3);
}

function easeInOut(value: number) {
  const t = clamp(value);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function seeded(index: number) {
  const value = Math.sin(index * 9283.31 + 17.17) * 43758.5453;
  return value - Math.floor(value);
}

function cubicPoint(a: Point, b: Point, c: Point, d: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * a.x + 3 * mt * mt * t * b.x + 3 * mt * t * t * c.x + t * t * t * d.x,
    y: mt * mt * mt * a.y + 3 * mt * mt * t * b.y + 3 * mt * t * t * c.y + t * t * t * d.y,
  };
}

function strokeSampledPath(
  ctx: CanvasRenderingContext2D,
  pointAt: (t: number) => Point,
  progress: number,
  width: number,
  color: string,
  alpha: number,
  dashOffset = 0,
) {
  const end = clamp(progress);
  if (end <= 0) return;
  ctx.save();
  ctx.beginPath();
  for (let index = 0; index <= 72; index += 1) {
    const t = (index / 72) * end;
    const point = pointAt(t);
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  }
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (dashOffset !== 0) {
    ctx.setLineDash([2, 18]);
    ctx.lineDashOffset = dashOffset;
  }
  ctx.stroke();
  ctx.restore();
}

function drawLayeredCurrent(
  ctx: CanvasRenderingContext2D,
  pointAt: (t: number) => Point,
  progress: number,
  strength: number,
  time: number,
) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  strokeSampledPath(ctx, pointAt, progress, 34 * strength, "#075a8f", 0.16);
  strokeSampledPath(ctx, pointAt, progress, 20 * strength, "#0a8fbd", 0.28);
  strokeSampledPath(ctx, pointAt, progress, 10 * strength, "#24d3ef", 0.74);
  strokeSampledPath(ctx, pointAt, progress, 3.2 * strength, "#eaffff", 0.92);
  strokeSampledPath(ctx, pointAt, progress, 1.5 * strength, "#ffffff", 0.65, -time * 0.08);
  ctx.restore();
}

function drawPalmTrace(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, alpha: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "#bff9ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 0, 19, 27, 0, 0, Math.PI * 2);
  ctx.stroke();
  for (let index = -2; index <= 2; index += 1) {
    ctx.beginPath();
    ctx.moveTo(index * 6.5, -20);
    ctx.quadraticCurveTo(index * 8, -37, index * 9, -54 + Math.abs(index) * 5);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(-17, 3);
  ctx.quadraticCurveTo(-34, -4, -37, -20);
  ctx.stroke();
  ctx.restore();
}

export function FlowSimulator() {
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const actionStartRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const reducedRef = useRef(false);
  const redrawRef = useRef<(() => void) | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const [phase, setPhase] = useState<Phase>("idle");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    if (!shell || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = media.matches;
    const pointer = { x: 0, y: 0 };
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let running = false;
    let visible = true;
    let pageVisible = !document.hidden;

    const assignPhase = (next: Phase) => {
      if (phaseRef.current === next) return;
      phaseRef.current = next;
      setPhase(next);
    };

    const drawBackground = (time: number, impact: number) => {
      const gradient = ctx.createRadialGradient(width * 0.58, height * 0.48, 0, width * 0.58, height * 0.48, width * 0.72);
      gradient.addColorStop(0, `rgba(10, 82, 105, ${0.25 + impact * 0.18})`);
      gradient.addColorStop(0.36, "rgba(4, 35, 50, 0.28)");
      gradient.addColorStop(1, "rgba(1, 6, 10, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.58 + pointer.x * 9;
      const cy = height * 0.49 + pointer.y * 7;
      ctx.save();
      ctx.strokeStyle = "rgba(86, 215, 235, 0.09)";
      ctx.lineWidth = 1;
      for (let index = 0; index < 7; index += 1) {
        const pulse = Math.sin(time * 0.00045 + index) * 3;
        ctx.beginPath();
        ctx.ellipse(cx, cy, width * (0.12 + index * 0.075) + pulse, height * (0.07 + index * 0.044) + pulse, -0.23, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      ctx.fillStyle = "rgba(116, 224, 239, 0.25)";
      const motes = width < 650 ? 38 : 76;
      for (let index = 0; index < motes; index += 1) {
        const baseX = seeded(index * 3) * width;
        const baseY = seeded(index * 3 + 1) * height;
        const drift = reducedRef.current ? 0 : Math.sin(time * 0.00035 + index) * 16;
        const radius = 0.45 + seeded(index * 3 + 2) * 1.55;
        ctx.globalAlpha = 0.1 + seeded(index + 8) * 0.34;
        ctx.beginPath();
        ctx.arc(baseX + drift + pointer.x * 4, baseY + Math.cos(time * 0.0002 + index) * 7, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawRock = (shatter: number, impact: number) => {
      const rockX = width * 0.84;
      const rockY = height * 0.48;
      const rockW = width * 0.19;
      const rockH = height * 0.56;
      const rockPoints: Point[] = [
        { x: rockX - rockW * 0.37, y: rockY - rockH * 0.49 },
        { x: rockX + rockW * 0.18, y: rockY - rockH * 0.46 },
        { x: rockX + rockW * 0.46, y: rockY - rockH * 0.18 },
        { x: rockX + rockW * 0.41, y: rockY + rockH * 0.28 },
        { x: rockX + rockW * 0.1, y: rockY + rockH * 0.49 },
        { x: rockX - rockW * 0.42, y: rockY + rockH * 0.39 },
        { x: rockX - rockW * 0.51, y: rockY - rockH * 0.05 },
      ];

      ctx.save();
      ctx.globalAlpha = 0.72 - shatter * 0.46;
      const rockGradient = ctx.createLinearGradient(rockX - rockW, rockY - rockH, rockX + rockW, rockY + rockH);
      rockGradient.addColorStop(0, "#263b47");
      rockGradient.addColorStop(0.55, "#111d24");
      rockGradient.addColorStop(1, "#071016");
      ctx.fillStyle = rockGradient;
      ctx.strokeStyle = "rgba(122, 207, 221, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      rockPoints.forEach((point, index) => index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      if (impact > 0) {
        ctx.save();
        ctx.translate(rockX - rockW * 0.44, rockY);
        ctx.strokeStyle = `rgba(174, 249, 255, ${0.42 + impact * 0.5})`;
        ctx.shadowColor = "#70efff";
        ctx.shadowBlur = 7;
        ctx.lineWidth = 1.2;
        const cracks = width < 650 ? 6 : 9;
        for (let index = 0; index < cracks; index += 1) {
          const angle = -1.35 + index * (2.7 / Math.max(1, cracks - 1));
          const length = (46 + seeded(index + 20) * 110) * easeOut(impact);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * length * 0.48, Math.sin(angle) * length * 0.48);
          ctx.lineTo(Math.cos(angle + 0.08) * length, Math.sin(angle + 0.08) * length);
          ctx.stroke();
        }
        ctx.restore();
      }

      if (shatter > 0) {
        const fragments = width < 650 ? 12 : 19;
        for (let index = 0; index < fragments; index += 1) {
          const angle = -1.15 + seeded(index + 50) * 2.3;
          const distance = easeOut(shatter) * (45 + seeded(index + 90) * width * 0.2);
          const x = rockX + Math.cos(angle) * distance;
          const y = rockY + Math.sin(angle) * distance + shatter * shatter * 46;
          const size = 5 + seeded(index + 120) * 16;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + shatter * (index % 2 ? 3 : -2));
          ctx.globalAlpha = 1 - shatter * 0.78;
          ctx.fillStyle = index < 3 ? "#6b99a8" : "#263842";
          ctx.strokeStyle = "rgba(165, 239, 248, 0.5)";
          ctx.beginPath();
          ctx.moveTo(-size, -size * 0.4);
          ctx.lineTo(size * 0.7, -size * 0.7);
          ctx.lineTo(size, size * 0.32);
          ctx.lineTo(-size * 0.35, size);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    const drawImpact = (cx: number, cy: number, power: number, time: number) => {
      if (power <= 0) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 72 * power);
      core.addColorStop(0, `rgba(255,255,255,${0.78 * power})`);
      core.addColorStop(0.14, `rgba(182,250,255,${0.68 * power})`);
      core.addColorStop(0.45, `rgba(27,207,238,${0.28 * power})`);
      core.addColorStop(1, "rgba(6,75,110,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 58 * power, 0, Math.PI * 2);
      ctx.fill();
      for (let index = 0; index < 3; index += 1) {
        ctx.globalAlpha = (0.7 - index * 0.18) * power;
        ctx.strokeStyle = index === 0 ? "#efffff" : "#4fe8f7";
        ctx.lineWidth = 2.2 - index * 0.45;
        ctx.beginPath();
        ctx.ellipse(cx, cy, (42 + index * 42 + power * 42) * power, (22 + index * 21 + power * 20) * power, -0.18, 0, Math.PI * 2);
        ctx.stroke();
      }
      const rays = width < 650 ? 12 : 22;
      for (let index = 0; index < rays; index += 1) {
        const angle = seeded(index + 180) * Math.PI * 2 + time * 0.00003;
        const length = (18 + seeded(index + 220) * 82) * power;
        ctx.globalAlpha = 0.2 + seeded(index + 240) * 0.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 10, cy + Math.sin(angle) * 10);
        ctx.lineTo(cx + Math.cos(angle) * length, cy + Math.sin(angle) * length);
        ctx.stroke();
      }
      ctx.restore();
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      let progress = completedRef.current ? 1 : 0;
      if (actionStartRef.current !== null) {
        progress = clamp((now - actionStartRef.current) / TOTAL_DURATION);
      }

      if (reducedRef.current && completedRef.current) progress = 1;

      const approach = easeOut(clamp(progress / 0.13));
      const cross = easeInOut(clamp((progress - 0.11) / 0.18));
      const redirect = easeInOut(clamp((progress - 0.28) / 0.24));
      const counter = easeOut(clamp((progress - 0.5) / 0.16));
      const shatter = easeOut(clamp((progress - 0.64) / 0.2));
      const settle = easeOut(clamp((progress - 0.82) / 0.18));
      const impactPower = clamp(counter * 1.18 - settle * 0.66);

      drawBackground(now, impactPower);

      const cx = width * 0.57;
      const cy = height * 0.49;
      const px = reducedRef.current ? 0 : pointer.x * 18 * (progress > 0 ? 0.15 : 1);
      const py = reducedRef.current ? 0 : pointer.y * 14 * (progress > 0 ? 0.15 : 1);
      const idlePulse = 0.5 + Math.sin(now * 0.0012) * 0.08;

      const currentA = (t: number) => cubicPoint(
        { x: width * 0.05, y: height * 0.84 },
        { x: width * 0.23 + px, y: height * 0.19 + py },
        { x: width * 0.49 - px, y: height * 0.65 - py },
        { x: cx, y: cy },
        t,
      );
      const currentB = (t: number) => cubicPoint(
        { x: width * 0.95, y: height * 0.08 },
        { x: width * 0.77 - px, y: height * 0.85 - py },
        { x: width * 0.67 + px, y: height * 0.2 + py },
        { x: cx, y: cy },
        t,
      );

      if (progress === 0) {
        drawLayeredCurrent(ctx, currentA, 0.9, idlePulse, now);
        drawLayeredCurrent(ctx, currentB, 0.82, idlePulse * 0.9, -now);
      } else {
        drawLayeredCurrent(ctx, currentA, cross, 0.72 + cross * 0.44, now);
        drawLayeredCurrent(ctx, currentB, cross, 0.68 + cross * 0.48, -now);
      }

      const orbitA = (t: number) => ({
        x: cx + Math.cos(-2.7 + t * Math.PI * 1.58) * width * 0.2,
        y: cy + Math.sin(-2.7 + t * Math.PI * 1.58) * height * 0.17,
      });
      const orbitB = (t: number) => ({
        x: cx + Math.cos(0.42 - t * Math.PI * 1.58) * width * 0.23,
        y: cy + Math.sin(0.42 - t * Math.PI * 1.58) * height * 0.19,
      });

      if (redirect > 0 || completedRef.current) {
        drawLayeredCurrent(ctx, orbitA, redirect || 1, 1.05, now);
        drawLayeredCurrent(ctx, orbitB, redirect || 1, 0.9, -now);
      }

      const strikeEnd = Math.min(width * 0.54, -width * 0.1 + approach * width * 0.66);
      if (progress > 0 && redirect < 1) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const strikeGradient = ctx.createLinearGradient(-width * 0.1, cy, strikeEnd, cy);
        strikeGradient.addColorStop(0, "rgba(255,54,76,0)");
        strikeGradient.addColorStop(0.62, "rgba(255,54,76,0.78)");
        strikeGradient.addColorStop(1, "#ffe6e9");
        ctx.strokeStyle = strikeGradient;
        ctx.shadowColor = "#ff334f";
        ctx.shadowBlur = 18;
        for (let index = 0; index < 4; index += 1) {
          ctx.globalAlpha = 0.9 - index * 0.17;
          ctx.lineWidth = 4 - index * 0.6;
          ctx.beginPath();
          ctx.moveTo(-width * 0.08 - index * 22, cy + (index - 1.5) * 8);
          ctx.lineTo(strikeEnd, cy);
          ctx.stroke();
        }
        ctx.restore();
      }

      if (redirect > 0) {
        const capturedStrike = (t: number) => ({
          x: cx + Math.cos(Math.PI + t * Math.PI * 1.38) * width * 0.17,
          y: cy + Math.sin(Math.PI + t * Math.PI * 1.38) * height * 0.14,
        });
        strokeSampledPath(ctx, capturedStrike, redirect, 6, "#ff4058", 0.72);
        strokeSampledPath(ctx, capturedStrike, redirect, 2, "#ffd9df", 0.9);
      }

      if (progress === 0 || cross > 0) {
        drawPalmTrace(ctx, cx - width * 0.07, cy + height * 0.055, -0.72, progress === 0 ? 0.42 : 0.48 + cross * 0.42);
        drawPalmTrace(ctx, cx + width * 0.075, cy - height * 0.06, Math.PI - 0.68, progress === 0 ? 0.42 : 0.48 + cross * 0.42);
      }

      if (counter > 0) {
        const blastEnd = width * (0.57 + counter * 0.31);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const blast = ctx.createLinearGradient(cx, cy, blastEnd, cy);
        blast.addColorStop(0, "rgba(240,255,255,0.15)");
        blast.addColorStop(0.52, "rgba(64,226,244,0.84)");
        blast.addColorStop(1, "rgba(255,255,255,0.96)");
        ctx.strokeStyle = blast;
        ctx.shadowColor = "#35dff2";
        ctx.shadowBlur = 24;
        ctx.lineCap = "round";
        ctx.lineWidth = 8 + counter * 12;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(width * 0.7, cy - height * 0.035, blastEnd, cy);
        ctx.stroke();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#f3ffff";
        ctx.stroke();
        ctx.restore();
      }

      drawRock(shatter, counter);
      drawImpact(counter > 0.92 ? width * 0.765 : cx, cy, counter > 0.92 ? impactPower : cross * (1 - redirect) * 0.55, now);

      if (progress >= 1 && actionStartRef.current !== null) {
        actionStartRef.current = null;
        completedRef.current = true;
        assignPhase("settle");
        setPlaying(false);
      } else if (actionStartRef.current !== null) {
        if (progress < 0.13) assignPhase("approach");
        else if (progress < 0.3) assignPhase("cross");
        else if (progress < 0.52) assignPhase("redirect");
        else if (progress < 0.66) assignPhase("counter");
        else if (progress < 0.84) assignPhase("shatter");
        else assignPhase("settle");
      }
    };

    const redraw = () => draw(performance.now());
    redrawRef.current = redraw;

    let lastDrawTime = 0;
    const tick = (time: number) => {
      if (!running) return;
      const frameInterval = actionStartRef.current === null ? 42 : 16;
      if (time - lastDrawTime >= frameInterval) {
        draw(time);
        lastDrawTime = time;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const start = () => {
      if (running || reducedRef.current || !visible || !pageVisible) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const resize = () => {
      const bounds = shell.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const cap = width < 650 ? 1.5 : 2;
      dpr = Math.min(window.devicePixelRatio || 1, cap);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      redraw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(shell);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        redraw();
        start();
      } else stop();
    }, { rootMargin: "120px" });
    intersectionObserver.observe(shell);

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedRef.current) return;
      const bounds = shell.getBoundingClientRect();
      pointer.x = clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1);
      pointer.y = clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1);
    };
    const onPointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedRef.current = event.matches;
      if (event.matches) {
        if (actionStartRef.current !== null) {
          actionStartRef.current = null;
          completedRef.current = true;
          assignPhase("settle");
          setPlaying(false);
        }
        stop();
        redraw();
      } else start();
    };

    shell.addEventListener("pointermove", onPointerMove);
    shell.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", onMotionChange);
    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      shell.removeEventListener("pointermove", onPointerMove);
      shell.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", onMotionChange);
      redrawRef.current = null;
    };
  }, []);

  const startSequence = () => {
    if (reducedRef.current) {
      actionStartRef.current = null;
      completedRef.current = true;
      phaseRef.current = "settle";
      setPhase("settle");
      setPlaying(false);
      window.requestAnimationFrame(() => redrawRef.current?.());
      return;
    }
    completedRef.current = false;
    actionStartRef.current = performance.now();
    phaseRef.current = "approach";
    setPhase("approach");
    setPlaying(true);
  };

  const currentIndex = phaseIndex[phase];

  return (
    <div ref={shellRef} className={`flow-simulator ${playing ? "is-playing" : ""}`}>
      <canvas ref={canvasRef} className="flow-canvas" aria-hidden="true" />
      <div className="stage-calligraphy" aria-hidden="true">
        <span>流</span>
        <span>碎</span>
      </div>
      <div className="stage-hud">
        <div className="stage-status" aria-hidden="true">
          <span>{phaseCopy[phase].label}</span>
          <strong>{phaseCopy[phase].title}</strong>
        </div>
        <ol aria-label="반류쇄경 전개 단계">
          {["접촉", "교차", "반류", "쇄암"].map((item, index) => (
            <li key={item} className={currentIndex >= index ? "is-current" : ""}>
              <span>{item}</span>
            </li>
          ))}
        </ol>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {playing
            ? "반류쇄경 시전을 시작했습니다."
            : phase === "settle"
              ? "반격과 암반 파쇄가 완료됐습니다."
              : "반류쇄경 시전 준비 상태입니다."}
        </p>
      </div>
      <button className="sequence-trigger" type="button" onClick={startSequence} disabled={playing}>
        <span>{phase === "idle" ? "쇄경 전개" : playing ? "시전 중" : "다시 시전"}</span>
        <i aria-hidden="true">反</i>
      </button>
    </div>
  );
}
