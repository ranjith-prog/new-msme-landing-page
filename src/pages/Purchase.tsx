import { useUser, SignInButton } from "@clerk/clerk-react";
import { motion } from "motion/react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Shield, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";

const PRODUCTS = {
  "edge-intelligence": {
    title: "Edge Intelligence",
    price: "$499/mo",
    description: "Global low-latency inference for your AI models.",
    image: "https://picsum.photos/seed/edge/800/600",
  },
  "zero-trust": {
    title: "Zero-Trust Security",
    price: "$299/mo",
    description: "Enterprise-grade security for modern infrastructure.",
    image: "https://picsum.photos/seed/security/800/600",
  }
};

export default function Purchase() {
  const { productId } = useParams();
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const product = PRODUCTS[productId as keyof typeof PRODUCTS] || PRODUCTS["edge-intelligence"];

  const handlePurchase = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/purchase-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Product Summary */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
               <div className="px-4 py-1 rounded-full glass text-xs font-bold uppercase tracking-widest mb-2">Premium Tier</div>
               <h1 className="text-4xl font-display font-bold">{product.title}</h1>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold">What's included</h2>
            <div className="grid gap-4">
              {[
                "Unlimited edge deployments",
                "Dedicated GPU clusters",
                "24/7 Priority engineering support",
                "Advanced threat detection",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-white/60">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 glass rounded-3xl border-indigo-500/20 bg-indigo-500/5">
            <p className="text-sm text-indigo-300 font-bold uppercase tracking-widest mb-1">Total Investment</p>
            <p className="text-5xl font-display font-bold">{product.price}<span className="text-xl text-white/40 font-sans">/month</span></p>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="p-10 glass rounded-[3rem] border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            
            {isSuccess ? (
              <div className="text-center py-20 space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-display font-bold">Intent Received!</h2>
                <p className="text-white/50">Redirecting you to your dashboard...</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-display font-bold mb-2">Complete Purchase</h2>
                <p className="text-white/40 mb-8">Confirm your details to proceed with the purchase intent.</p>

                {!isSignedIn ? (
                  <div className="p-10 text-center border-2 border-dashed border-white/10 rounded-3xl">
                    <p className="text-white/60 mb-6">Please sign in to complete your purchase.</p>
                    <SignInButton mode="modal">
                      <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all">
                        Sign In to Continue
                      </button>
                    </SignInButton>
                  </div>
                ) : (
                  <form onSubmit={handlePurchase} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                      <input 
                        type="text" 
                        readOnly 
                        value={user.fullName || ""} 
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                      <input 
                        type="email" 
                        readOnly 
                        value={user.primaryEmailAddress?.emailAddress || ""} 
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        disabled={isSubmitting}
                        className="w-full group relative px-8 py-5 bg-indigo-600 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? "Processing..." : "Confirm Purchase Intent"} 
                          {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                    
                    <p className="text-[10px] text-center text-white/20 uppercase tracking-widest leading-relaxed">
                      By clicking confirm, you agree to our terms of service and acknowledge that this is a purchase intent demonstration.
                    </p>
                  </form>
                )}
              </>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-6 glass rounded-3xl flex items-center gap-4">
              <Shield className="w-6 h-6 text-indigo-400" />
              <span className="text-xs font-bold text-white/60">Secure SSL Encryption</span>
            </div>
            <div className="p-6 glass rounded-3xl flex items-center gap-4">
              <Zap className="w-6 h-6 text-purple-400" />
              <span className="text-xs font-bold text-white/60">Instant Activation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
