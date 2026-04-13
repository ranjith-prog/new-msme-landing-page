import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section id="pricing" className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative rounded-[4rem] overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 md:p-24 text-center"
      >
        <div className="absolute inset-0 bg-noise opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-white/10 to-transparent" />
        
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 tracking-tight">
            Ready to build the <br />
            <span className="text-black/30">future?</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
            Join thousands of developers building the next generation of intelligent applications on Nexus.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => {
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 flex items-center gap-2"
            >
              Get Started for Free <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-black/20 text-white font-bold rounded-2xl hover:bg-black/30 active:scale-95 transition-all border border-white/10">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Decorative Orbs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-xl animate-pulse-slow" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/20 rounded-full blur-xl animate-pulse-slow" />
      </motion.div>
    </section>
  );
}
