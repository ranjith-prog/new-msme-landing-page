import { motion } from "motion/react";
import { Menu, X, Zap, LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 pointer-events-none"
    >
      <div className="flex items-center justify-between w-full max-w-7xl px-6 py-3 glass-dark rounded-full pointer-events-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight uppercase">MSME tools</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Products", id: "products" },
            { name: "Solutions", id: "solutions" },
            { name: "Developers", id: "developers" },
            { name: "Pricing", id: "pricing" }
          ].map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else window.location.href = `/#${item.id}`;
              }}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="w-24 h-8 bg-white/5 animate-pulse rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-6">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-2 text-sm font-medium text-red-400/80 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/login"
                className="px-5 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button 
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-24 left-6 right-6 p-6 glass-dark rounded-3xl md:hidden pointer-events-auto"
        >
          <div className="flex flex-col gap-6">
            {[
              { name: "Products", id: "products" },
              { name: "Solutions", id: "solutions" },
              { name: "Developers", id: "developers" },
              { name: "Pricing", id: "pricing" }
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else window.location.href = `/#${item.id}`;
                }}
              >
                {item.name}
              </a>
            ))}
            <hr className="border-white/10" />
            {user ? (
              <div className="flex flex-col gap-4">
                <Link 
                  to="/dashboard" 
                  className="w-full py-4 text-center text-lg font-semibold text-white bg-white/5 rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  Go to Dashboard
                </Link>
                <button 
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="w-full py-4 text-center text-lg font-semibold text-red-500 bg-red-500/10 rounded-2xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="w-full py-4 text-center text-lg font-semibold text-white bg-indigo-600 rounded-2xl"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
