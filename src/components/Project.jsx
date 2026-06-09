import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "D'Andalimans FnB Ordering System",
    desc: "A web-based food and beverage ordering system built using ReactJS and localStorage to persist user order data seamlessly.",
    link: "https://d-andalimans.vercel.app/",
    image: "/images/dandalimans.png",
    color: "red", // Disesuaikan dengan aksen tema warna D'Andalimans
  },
  {
    title: "Do-it E-Wallet",
    desc: "A modern digital wallet application designed to facilitate fast, secure, and highly efficient financial transactions.",
    link: "https://doit-in.vercel.app/",
    image: "/images/doit.jpg",
    color: "blue", // Disesuaikan dengan tema aplikasi Fintech/E-Wallet Do-it yang bernuansa biru
  },
  {
    title: "JKT 23 FC Landing Page",
    desc: "An interactive landing page for the JKT 23 FC football club, showcasing team profiles, match schedules, and contact details.",
    link: "https://jkt23fc.vercel.app/",
    image: "/images/jkt.png",
    color: "purple", // Disesuaikan dengan aksen warna klub sepak bola JKT 23 FC
  },
  {
    title: "Golkar Internship Attendance Web",
    desc: "A web-based attendance platform for Golkar interns to record daily check-ins, tasks, and internship activities efficiently.",
    link: "https://gisprogram.com",
    image: "/images/ss-gis.png",
    color: "orange", // Menggunakan 'orange' (gradasi kuning tua/amber) untuk menyelaraskan dengan warna khas Golkar
  },
];

const Project = () => {
  return (
    // Mengubah bg-gradient gelap lama menjadi bg-transparent agar tembus pandang ke LiquidEther
    <section className="relative py-24 px-6 bg-transparent text-gray-100 overflow-hidden">

      <div className="max-w-7xl mx-auto text-center relative z-10">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          My Projects
        </motion.h2>

        <p className="text-gray-400 text-lg mb-16">
          A curated selection of featured projects crafted by{" "}
          <span className="text-green-400 font-semibold">Me</span>.
        </p>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              // bg-white/5 dan backdrop-blur-xl dipertahankan agar memberikan efek kaca buram di atas cairan background
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-green-400/20 transition-all duration-500 flex flex-col"
            >

              {/* Image */}
              <div className="relative h-52 overflow-hidden">

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 bg-green-500 rounded-full text-white font-semibold hover:bg-green-400 transition"
                  >
                    Visit Site <FaExternalLinkAlt />
                  </a>
                </div>

              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow text-left justify-between">

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed min-h-[60px]">
                    {project.desc}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Project;