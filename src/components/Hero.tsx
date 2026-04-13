import { motion } from "motion/react";
import { ArrowRight, Sparkles, Shield, Zap, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center pt-24 md:pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[60px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[60px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-300">
              Introducing Nexus v2.0
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-6 break-words">
            Infrastructure for the <br className="hidden sm:block" />
            <span className="text-gradient">Intelligent Age.</span>
          </h1>

          <p className="text-xl text-white/60 max-w-xl mb-10 leading-relaxed">
            Nexus provides the high-performance backbone for modern AI applications. 
            Deploy globally, scale infinitely, and secure everything with a single API.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Building Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="px-8 py-4 glass text-white font-bold rounded-2xl transition-all hover:bg-white/10 active:scale-95">
              View Documentation
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-neutral-800 overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-white/40">
              Trusted by <span className="text-white font-semibold">2,000+</span> engineering teams
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 p-6 glass rounded-3xl border-white/20 shadow-2xl z-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold">Security Shield</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 2, delay: 1 }}
                className="h-full bg-indigo-500" 
              />
            </div>
            <p className="text-xs text-white/40 mt-2">Threat detection active</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-0 w-72 p-6 glass rounded-3xl border-white/20 shadow-2xl z-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-bold">Global Edge</span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
                  className="flex-1 bg-purple-500/50 rounded-t-sm"
                />
              ))}
            </div>
            <p className="text-xs text-white/40 mt-2">12ms average latency</p>
          </motion.div>

          {/* Main Visual */}
          <div className="relative w-full aspect-square rounded-[4rem] bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-noise opacity-[0.05]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative w-3/4 h-3/4 rounded-full border border-white/5 flex items-center justify-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl glass flex items-center justify-center">
                <Globe className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="w-1/2 h-1/2 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 blur-[40px] opacity-30" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center animate-pulse-slow">
                <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center">
                   <Zap className="w-12 h-12 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
