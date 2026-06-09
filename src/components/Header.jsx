import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiGmail, SiJavascript, SiTailwindcss } from "react-icons/si";
import ProfileCard from "./ProfileCard";
import GlassIcons from "./GlassIcons";

const roles = [
  "Web Developer",
  "React Enthusiast",
  "UI/UX Designer",
];

const Header = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typing = setTimeout(() => {
      if (charIndex < roles[index].length) {
        setText((prev) => prev + roles[index][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setText("");
          setCharIndex(0);
          setIndex((index + 1) % roles.length);
        }, 1500);
      }
    }, 70);

    return () => clearTimeout(typing);
  }, [charIndex, index]);

  // Mengonfigurasi array data sosial media dengan property onClick agar dibaca pas di GlassIcons
  const socialItems = [
    { 
      icon: <SiGmail className="text-2xl" />, 
      color: "red", 
      label: "Email",
      onClick: () => window.open("mailto:fwzfian@gmail.com", "_blank")
    },
    { 
      icon: <FaLinkedin className="text-2xl" />, 
      color: "blue", 
      label: "LinkedIn",
      onClick: () => window.open("https://linkedin.com/in/favianfawaz", "_blank")
    },
    { 
      icon: <FaGithub className="text-2xl" />, 
      color: "orange", 
      label: "GitHub",
      onClick: () => window.open("https://github.com/fianfwz", "_blank")
    },
    { 
      icon: <FaInstagram className="text-2xl" />, 
      color: "purple", 
      label: "Instagram",
      onClick: () => window.open("https://instagram.com/fwzfian", "_blank")
    },
    { 
      icon: <FaWhatsapp className="text-2xl" />, 
      color: "green", 
      label: "WhatsApp",
      onClick: () => window.open("https://wa.me/6281210940483", "_blank")
    },
  ];

  return (
    <header className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 bg-transparent text-white overflow-hidden text-center">

      {/* Orbit Icons Background */}
      <div className="absolute w-[400px] h-[400px] animate-spin-slow pointer-events-none opacity-40">
        <FaReact className="absolute top-0 left-1/2 text-blue-400 text-5xl -translate-x-1/2" />
        <SiJavascript className="absolute right-0 top-1/2 text-yellow-400 text-4xl -translate-y-1/2" />
        <SiTailwindcss className="absolute bottom-0 left-1/2 text-cyan-400 text-4xl -translate-x-1/2" />
        <FaNodeJs className="absolute left-0 top-1/2 text-green-400 text-4xl -translate-y-1/2" />
      </div>

      {/* Profile Card Layer */}
      <div className="relative z-10 mb-12">
        <ProfileCard
          name="Favian Fawaz"
          title="MERCU BUANA UNIVERSITY"
          handle="fianfwz"
          status={text || "Typing..."}
          contactText="Chat Me"
          avatarUrl="./images/foto-profile.jpg"
          showUserInfo={true}
          enableTilt={true}
          behindGlowEnabled={true}
          onContactClick={() => {
            window.open("https://wa.me/6281210940483", "_blank");
          }}
        />
      </div>

      {/* Hero Text */}
      <div className="max-w-2xl relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">
          Favian Fawaz Idrakhi
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mt-3 font-medium">
          Passionate about building modern web interfaces.
        </p>

        {/* Pembungkus GlassIcons yang disinkronkan dengan z-50 agar bebas klik dari gangguan layer lain */}
        <div className="relative z-50 w-full max-w-4xl mx-auto my-10 py-12 px-6 flex justify-center items-center overflow-visible">
          <div className="scale-90 sm:scale-100 transition-transform duration-300 overflow-visible">
            <GlassIcons 
              items={socialItems} 
              className="!grid-cols-3 md:!grid-cols-5 gap-x-12 gap-y-14 max-w-full"
            />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
      @keyframes gradientMove {
        0% { background-position: 0% }
        100% { background-position: 200% }
      }

      .animate-gradient {
        background-size: 200%;
        animation: gradientMove 6s linear infinite;
      }

      @keyframes spinSlow {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
      }

      .animate-spin-slow {
        animation: spinSlow 25s linear infinite;
      }
      `}</style>

    </header>
  );
};

export default Header;