import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Cpu, Globe, Lock, Zap, BarChart3 } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface BentoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  gradient: string;
  productId?: string;
}

function BentoCard({ title, description, icon, className, gradient, productId }: BentoCardProps) {
  const CardContent = (
    <>
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-linear-to-br", gradient)} />
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
        <p className="text-white/50 leading-relaxed">{description}</p>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-white transition-colors">
        {productId ? "Proceed to Purchase" : "Learn more"} <Zap className="w-3 h-3 fill-current" />
      </div>
      
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors" />
    </>
  );

  const wrapperClass = cn(
    "relative group overflow-hidden rounded-[2.5rem] border border-white/10 p-8 flex flex-col justify-between transition-all duration-500",
    className
  );

  if (productId) {
    return (
      <motion.div whileHover={{ y: -5, scale: 1.01 }}>
        <Link to={`/purchase/${productId}`} className={wrapperClass}>
          {CardContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={wrapperClass}
    >
      {CardContent}
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section id="products" className="py-32 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
          Engineered for <span className="text-gradient">Performance.</span>
        </h2>
        <p className="text-xl text-white/50 max-w-2xl">
          Everything you need to build, deploy, and scale your intelligent applications 
          without the infrastructure headache.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <BentoCard
          className="md:col-span-4 md:row-span-2 min-h-[400px]"
          title="Edge Intelligence"
          description="Deploy your models to 300+ edge locations globally. Reduce latency to single-digit milliseconds and provide a seamless experience for users anywhere on Earth."
          icon={<Globe className="w-6 h-6 text-indigo-400" />}
          gradient="from-indigo-500 to-blue-500"
          productId="edge-intelligence"
        />

        <BentoCard
          className="md:col-span-2"
          title="Zero-Trust Security"
          description="Enterprise-grade security baked into every layer of your stack."
          icon={<Lock className="w-6 h-6 text-purple-400" />}
          gradient="from-purple-500 to-pink-500"
          productId="zero-trust"
        />

        <BentoCard
          className="md:col-span-2"
          title="Real-time Analytics"
          description="Insight into every request, model execution, and edge event."
          icon={<BarChart3 className="w-6 h-6 text-emerald-400" />}
          gradient="from-emerald-500 to-teal-500"
        />

        <BentoCard
          className="md:col-span-3"
          title="Compute Engine"
          description="High-performance GPU clusters optimized for inference and training."
          icon={<Cpu className="w-6 h-6 text-orange-400" />}
          gradient="from-orange-500 to-red-500"
        />

        <BentoCard
          className="md:col-span-3"
          title="Instant Scaling"
          description="From zero to millions of requests in seconds without manual tuning."
          icon={<Zap className="w-6 h-6 text-yellow-400" />}
          gradient="from-yellow-500 to-orange-500"
        />
      </div>
    </section>
  );
}
