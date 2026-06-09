import { useState } from "react";
import Header from "./components/Header";
import Project from "./components/Project";
import Experience from "./components/Experience";
import Skill from "./components/Skills";
import Footer from "./components/Footer";
import LiquidEther from "./components/LiquidEther";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Container Utama */}
      <div className="min-h-screen text-black dark:text-white transition-colors duration-300 relative">
        
        {/* FIXED BACKGROUND GLOBAL */}
        {/* Menggunakan `fixed` agar background tidak ikut bergeser saat di-scroll */}
        <div className="fixed inset-0 z-0 bg-slate-950">
          <LiquidEther
            colors={darkMode ? ['#5227FF', '#FF9FFC', '#B497CF'] : ['#3B82F6', '#6EE7B7', '#8B5CF6']}
            mouseForce={25}
            cursorSize={100}
            autoDemo={true}
          />
        </div>

        {/* LAYER KONTEN UTAMA */}
        {/* Dibuat relatif dengan z-10 agar berada di atas background cairan */}
        <div className="relative z-10 w-full min-h-screen pointer-events-none">
          
          {/* Setiap komponen dibungkus dengan pointer-events-auto */}
          {/* Ini penting agar tombol, link, dan card di dalam komponen tetap bisa di-klik */}
          <div className="pointer-events-auto">
            <Header />
          </div>

          <div className="pointer-events-auto">
            <Project />
          </div>

          <div className="pointer-events-auto">
            <Experience />
          </div>

          <div className="pointer-events-auto">
            <Skill />
          </div>

          <div className="pointer-events-auto">
            <Footer />
          </div>

        </div>

      </div>
    </div>
  );
}