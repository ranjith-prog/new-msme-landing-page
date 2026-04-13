import { motion } from "motion/react";

const LOGOS = [
  "STRIPE", "LINEAR", "VERCEL", "APPLE", "OPENAI", "META"
];

export default function TrustSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <p className="text-center text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-12">
          Powering the next generation of giants
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {LOGOS.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <span className="text-2xl md:text-3xl font-display font-black tracking-tighter text-white/20 group-hover:text-white/80 transition-colors duration-500">
                {logo}
              </span>
              <div className="absolute -bottom-2 left-0 w-0 h-px bg-linear-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500" />
              <div className="absolute -inset-4 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
