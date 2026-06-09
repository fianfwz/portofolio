import React, { useEffect, useRef, useCallback, useMemo } from 'react';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, rgba(10, 10, 24, 0.7) 0%, rgba(20, 18, 54, 0.5) 50%, rgba(12, 10, 28, 0.8) 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const KEYFRAMES_ID = 'pc-keyframes-v2';
if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes pc-holo-bg {
      0% { background-position: 0 var(--background-y), 0 0, center; }
      100% { background-position: 0 var(--background-y), 90% 90%, center; }
    }
  `;
  document.head.appendChild(style);
}

const ProfileCardComponent = ({
  avatarUrl = '',
  iconUrl = '',
  grainUrl = '',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  name = 'Favian Fawaz',
  title = 'MERCU BUANA UNIVERSITY',
  status = 'Web Developer', // Menerima teks mengetik live dari Header.jsx
  onContactClick
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);

  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
        '--card-opacity': '1'
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = ts => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    event => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    event => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    shell.addEventListener('pointerenter', handlePointerEnter);
    shell.addEventListener('pointermove', handlePointerMove);
    shell.addEventListener('pointerleave', handlePointerLeave);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', handlePointerEnter);
      shell.removeEventListener('pointermove', handlePointerMove);
      shell.removeEventListener('pointerleave', handlePointerLeave);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
    };
  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  const cardRadius = '24px';

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor ?? 'rgba(99, 102, 241, 0.25)',
      '--behind-glow-size': behindGlowSize ?? '70%',
      '--pointer-x': '50%',
      '--pointer-y': '50%',
      '--pointer-from-center': '0',
      '--pointer-from-top': '0.5',
      '--pointer-from-left': '0.5',
      '--card-opacity': '1', 
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--background-x': '50%',
      '--background-y': '50%',
      '--card-radius': cardRadius,
      '--sunpillar-1': 'hsl(220, 80%, 65%)',
      '--sunpillar-2': 'hsl(260, 80%, 65%)',
      '--sunpillar-3': 'hsl(290, 80%, 65%)',
      '--sunpillar-4': 'hsl(180, 80%, 65%)',
      '--sunpillar-clr-1': 'var(--sunpillar-1)',
      '--sunpillar-clr-2': 'var(--sunpillar-2)',
      '--sunpillar-clr-3': 'var(--sunpillar-3)',
      '--sunpillar-clr-4': 'var(--sunpillar-4)',
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize, cardRadius]
  );

  const shineStyle = {
    filter: 'brightness(0.3) contrast(1.1) opacity(0.3)', 
    animation: 'pc-holo-bg 22s linear infinite',
    mixBlendMode: 'screen',
    transform: 'translate3d(0, 0, 1px)',
    overflow: 'hidden',
    zIndex: 3,
    backgroundImage: `
      repeating-linear-gradient(
        45deg,
        var(--sunpillar-clr-1) 0%,
        var(--sunpillar-clr-2) 10%,
        var(--sunpillar-clr-3) 20%,
        var(--sunpillar-clr-4) 30%,
        var(--sunpillar-clr-1) 40%
      ),
      radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        rgba(255,255,255,0.1) 0%,
        rgba(0,0,0,0.4) 100%
      )
    `.replace(/\s+/g, ' '),
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none'
  };

  const glareStyle = {
    transform: 'translate3d(0, 0, 1.1px)',
    backgroundImage: `radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsla(255, 40%, 85%, 0.25) 0%,
      hsla(240, 30%, 10%, 0.8) 100%
    )`,
    mixBlendMode: 'soft-light',
    filter: 'brightness(0.8)',
    zIndex: 4,
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none'
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none mx-auto w-[310px] ${className}`.trim()}
      style={{ perspective: '1200px', transform: 'translate3d(0, 0, 0.1px)', ...cardStyle }}
    >
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: 'blur(50px)',
            opacity: 'var(--card-opacity)'
          }}
        />
      )}
      <div ref={shellRef} className="relative z-[1]">
        <section
          className="grid relative overflow-hidden backface-hidden border border-white/[0.08]"
          style={{
            height: '450px',
            borderRadius: cardRadius,
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.8), inset 0 1px 0px 0px rgba(255,255,255,0.1)',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
            background: '#07070f' 
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transition = 'none';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transition = 'transform 0.5s ease';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'var(--inner-gradient)',
              borderRadius: cardRadius,
              display: 'grid',
              gridArea: '1 / -1'
            }}
          >
            {/* Cyber Grid Pattern */}
            <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay"
                 style={{
                   backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                   backgroundSize: '20px 20px',
                   maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 90%)',
                   WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 90%)'
                 }} 
            />

            <div style={shineStyle} />
            <div style={glareStyle} />

            {/* MAIN INTERIOR */}
            <div
              className="absolute inset-0 z-[5] flex flex-col items-center justify-between p-8"
              style={{ transform: 'translateZ(10px)' }}
            >
              {/* TOP: Foto Profil Bulat */}
              <div 
                className="relative mt-4 w-32 h-32 rounded-full p-[3px] bg-gradient-to-b from-white/20 via-indigo-500/30 to-purple-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] will-change-transform transition-transform duration-200"
                style={{
                  transform: 'translateX(calc((var(--pointer-from-left) - 0.5) * 8px)) translateY(calc((var(--pointer-from-top) - 0.5) * 8px))',
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border border-black/40 bg-slate-900">
                  <img
                    className="w-full h-full object-cover select-none"
                    src={avatarUrl}
                    alt={name}
                    loading="lazy"
                  />
                </div>
                
              </div>

              {/* BOTTOM: Informasi Teks */}
              <div 
                className="w-full flex flex-col items-center text-center mb-2"
                style={{
                  transform: 'translateX(calc((var(--pointer-from-left) - 0.5) * -4px)) translateY(calc((var(--pointer-from-top) - 0.5) * -4px))',
                }}
              >
                {/* Nama Lengkap */}
                <h3
                  className="font-black text-2xl tracking-wide m-0"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, #ffffff 60%, #cbd5e1)',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  {name}
                </h3>
                
                {/* Universitas */}
                <p className="font-bold uppercase tracking-widest text-[9px] text-gray-400 mt-1.5 mb-0">
                  {title}
                </p>

                {/* Live Typing Roles dari Header.jsx */}
                <div className="h-5 flex justify-center items-center mt-1 w-full">
                  <p className="font-semibold text-xs text-indigo-400 m-0 min-h-[1.25rem]">
                    {status}
                    <span className="inline-block w-[2px] h-3.5 bg-indigo-400 ml-0.5 animate-pulse" />
                  </p>
                </div>

                {/* Divider Line */}
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />

                {/* CTA Button */}
                <button
                  onClick={onContactClick}
                  className="pointer-events-auto group/btn relative flex items-center justify-center px-6 py-2.5 w-40 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/40 text-xs font-bold tracking-wider uppercase text-gray-200 hover:text-white transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer overflow-hidden"
                  type="button"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-1.5">
                    Connect Me 
                    <span className="inline-block transform group-hover/btn:translate-x-0.5 transition-transform">→</span>
                  </span>
                </button>
              </div>
            </div>
            
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;