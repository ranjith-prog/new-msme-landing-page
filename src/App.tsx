/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Purchase from "./pages/Purchase";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-black selection:bg-indigo-500/30">
      {/* Custom Cursor Glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 opacity-30"
        animate={{
          background: `radial-gradient(400px at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.1), transparent 80%)`,
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchase/:productId" element={<Purchase />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-[0.02]" />
    </div>
  );
}

