import { motion } from "motion/react";
import { Menu, X, Zap, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useUser, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

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
          <span className="text-xl font-display font-bold tracking-tight">NEXUS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["Products", "Solutions", "Developers", "Pricing"].map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!isLoaded ? (
            <div className="w-24 h-8 bg-white/5 animate-pulse rounded-full" />
          ) : isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="px-5 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all active:scale-95">
                  Get Started
                </button>
              </SignInButton>
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
            {["Products", "Solutions", "Developers", "Pricing"].map((item) => (
              <Link
                key={item}
                to={`/#${item.toLowerCase()}`}
                className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <hr className="border-white/10" />
            {isSignedIn ? (
              <Link 
                to="/dashboard" 
                className="w-full py-4 text-center text-lg font-semibold text-white bg-indigo-600 rounded-2xl"
                onClick={() => setIsOpen(false)}
              >
                Go to Dashboard
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button 
                  className="w-full py-4 text-lg font-semibold text-white bg-indigo-600 rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </button>
              </SignInButton>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
