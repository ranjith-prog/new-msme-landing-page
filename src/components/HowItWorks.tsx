import { motion } from "motion/react";
import { Code2, Rocket, Share2 } from "lucide-react";

const STEPS = [
  {
    title: "Connect your Stack",
    description: "Integrate Nexus with your existing codebase using our lightweight SDK.",
    icon: <Code2 className="w-8 h-8" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Optimize & Deploy",
    description: "Our AI automatically optimizes your models for edge performance.",
    icon: <Rocket className="w-8 h-8" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    title: "Scale Globally",
    description: "Your application is instantly available across our global network.",
    icon: <Share2 className="w-8 h-8" />,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Simple yet <span className="text-gradient">Powerful.</span></h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Go from local development to global production in three simple steps.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent hidden lg:block" />
          
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center max-w-sm"
            >
              <div className={`w-24 h-24 rounded-3xl ${step.bg} ${step.color} flex items-center justify-center mb-8 border border-white/5 shadow-2xl shadow-black/50 group`}>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{step.title}</h3>
              <p className="text-white/50 leading-relaxed">
                {step.description}
              </p>
              
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full glass flex items-center justify-center text-sm font-mono font-bold text-white/40">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
