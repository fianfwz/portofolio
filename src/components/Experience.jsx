import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";

const experiences = [
  {
    role: "Frontend Developer Intern",
    company: "PT Asuransi Starinvestama",
    period: "March 19, 2025 - March 18, 2026",
    description:
      "Engineered responsive insurance data table web applications utilizing React.js. Focused heavily on creating modern UI/UX, integrating RESTful APIs, and maximizing front-end performance.",
  },
  {
    role: "Founder & Web Developer",
    company: "Kita Rancang Agency",
    period: "August 2025 - Present",
    description:
      "Founded and spearheaded a digital marketing agency focusing on custom web development, comprehensive SEO optimization strategies, and social media brand management.",
  },
];

const Experience = () => {
  return (
    <section className="relative py-24 px-6 bg-transparent text-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title Header - Centered */}
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.2)]"
          >
            <Briefcase className="w-8 h-8 text-green-400" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold"
          >
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Work Experience
            </span>
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-blue-500 mt-4 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="relative md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-1/2 md:before:-translate-x-1/2 md:before:w-[2px] md:before:bg-gradient-to-b md:before:from-green-500 md:before:via-blue-500 md:before:to-transparent border-l border-gray-700 md:border-l-0">
          
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className={`relative mb-16 md:mb-20 flex flex-col md:flex-row items-center w-full ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
              >
                
                {/* Timeline Dot (Sumbu Tengah di Desktop, Sumbu Kiri di Mobile) */}
                <div className="absolute left-0 md:left-1/2 top-4 -translate-x-[9px] md:-translate-x-1/2 z-20 flex h-4 w-4 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-r from-green-500 to-blue-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                </div>

                {/* Card Wrapper Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`w-full md:w-[calc(50%-30px)] pl-8 md:pl-0 ${
                    isEven ? "md:text-right md:pr-4" : "md:text-left md:pl-4"
                  }`}
                >
                  {/* Glassmorphic Container Card */}
                  <div className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-green-500/10 hover:border-green-500/30 transition-all duration-500">
                    
                    {/* Role Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                      {exp.role}
                    </h3>

                    {/* Company Name & Icon */}
                    <div className={`flex items-center gap-2 text-green-400 font-semibold mt-2 ${
                      isEven ? "md:justify-end" : "md:justify-start"
                    }`}>
                      {isEven && <span className="hidden md:inline">{exp.company}</span>}
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      {(!isEven || window.innerWidth < 768) && <span>{exp.company}</span>}
                    </div>

                    {/* Timeline Period */}
                    <div className={`flex items-center gap-2 text-sm text-gray-400 mt-2 font-medium ${
                      isEven ? "md:justify-end" : "md:justify-start"
                    }`}>
                      {isEven && <span className="hidden md:inline">{exp.period}</span>}
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {(!isEven || window.innerWidth < 768) && <span>{exp.period}</span>}
                    </div>

                    {/* Description Text */}
                    <p className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Decorative Card Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-green-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />

                  </div>
                </motion.div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Experience;