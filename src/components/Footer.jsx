import React from "react";

const Footer = () => {
  return (
    // Mengubah bg-gradient gelap lama menjadi bg-transparent agar tembus pandang ke LiquidEther
    <footer className="py-20 px-6 bg-transparent text-gray-400">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm tracking-wide">
          &copy; {new Date().getFullYear()} Favian Fawaz Idrakhi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;