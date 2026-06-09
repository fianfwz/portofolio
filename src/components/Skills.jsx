import React, { useEffect, useState } from "react";
import { FaHtml5, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiSupabase,
} from "react-icons/si";

const skills = [
  {
    name: "HTML",
    percent: 80,
    icon: <FaHtml5 className="text-orange-500 text-2xl sm:text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />,
    glowClass: "hover:shadow-orange-500/20 hover:border-orange-500/30",
    barColor: "from-orange-600 via-orange-500 to-amber-400",
  },
  {
    name: "JavaScript",
    percent: 75,
    icon: <SiJavascript className="text-yellow-400 text-2xl sm:text-3xl rounded transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />,
    glowClass: "hover:shadow-yellow-500/20 hover:border-yellow-500/30",
    barColor: "from-yellow-600 via-yellow-500 to-amber-300",
  },
  {
    name: "React",
    percent: 75,
    icon: <FaReact className="text-blue-400 text-2xl sm:text-3xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-180" />,
    glowClass: "hover:shadow-blue-500/20 hover:border-blue-400/30",
    barColor: "from-blue-600 via-blue-500 to-cyan-400",
  },
  {
    name: "Next.js",
    percent: 60,
    icon: <SiNextdotjs className="text-white text-2xl sm:text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:translate-y-[-2px]" />,
    glowClass: "hover:shadow-white/10 hover:border-white/30",
    barColor: "from-zinc-700 via-zinc-500 to-zinc-300",
  },
  {
    name: "Tailwind CSS",
    percent: 60,
    icon: <SiTailwindcss className="text-teal-400 text-2xl sm:text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-1" />,
    glowClass: "hover:shadow-teal-500/20 hover:border-teal-400/30",
    barColor: "from-teal-600 via-teal-500 to-cyan-300",
  },
  {
    name: "Node.js",
    percent: 70,
    icon: <FaNodeJs className="text-green-500 text-2xl sm:text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />,
    glowClass: "hover:shadow-green-500/20 hover:border-green-400/30",
    barColor: "from-green-600 via-green-500 to-emerald-400",
  },
  {
    name: "Express.js",
    percent: 50,
    icon: <SiExpress className="text-gray-300 text-2xl sm:text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:skew-x-3" />,
    glowClass: "hover:shadow-gray-400/20 hover:border-gray-400/30",
    barColor: "from-gray-600 via-gray-400 to-zinc-300",
  },
  {
    name: "Supabase",
    percent: 65,
    icon: <SiSupabase className="text-emerald-400 text-2xl sm:text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />,
    glowClass: "hover:shadow-emerald-500/20 hover:border-emerald-400/30",
    barColor: "from-emerald-600 via-emerald-500 to-teal-400",
  },
];

const Skill = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Memberikan delay mikro agar animasi mount CSS terpicu dengan mulus setelah halaman render
    const timeout = setTimeout(() => {
      setAnimated(true);
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen bg-transparent px-4 sm:px-6 py-20 text-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header - Tipografi & Sub-judul Dipercantik */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 flex items-center gap-3 justify-center">
            <span className="text-green-400 animate-pulse text-3xl sm:text-4xl">⚡</span>
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
              My Technical Stack
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Technologies and frameworks I use to bring efficient, modern, and fluid digital solutions to life.
          </p>
        </div>

        {/* Skill Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className={`group relative w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-md hover:-translate-y-1.5 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${skill.glowClass}`}
            >
              {/* Card Aura Background Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div>
                    {skill.icon}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-gray-200 tracking-wide group-hover:text-white transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
                {/* Counter Persentase Bergaya Monospace Neon */}
                <span className="text-xs sm:text-sm font-mono font-bold text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/5 shadow-inner">
                  {skill.percent}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="relative w-full bg-zinc-900/60 rounded-full h-2.5 p-[1px] border border-white/5 overflow-hidden">
                {/* Liquid Fill Line */}
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.barColor} shadow-[0_0_12px_rgba(34,197,94,0.3)]`}
                  style={{ 
                    width: animated ? `${skill.percent}%` : "0%",
                    transition: "width 1.5s cubic-bezier(0.25, 1, 0.5, 1)" // Transisi mulus menyerupai laju aliran cairan
                  }}
                ></div>

                {/* Spark / Fluid Head Node Animation */}
                {animated && (
                  <span
                    className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-white blur-[0.5px] animate-spark"
                    style={{
                      left: `${skill.percent}%`,
                      transform: "translate(-50%, -50%)",
                      transition: "left 1.5s cubic-bezier(0.25, 1, 0.5, 1)"
                    }}
                  ></span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Embedded High-Quality Animation Keyframes */}
      <style>{`
        @keyframes spark {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.8; box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.6); }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; box-shadow: 0 0 12px 4px rgba(52, 211, 153, 0.8); }
          100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.8; box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.6); }
        }

        .animate-spark {
          animation: spark 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Skill;