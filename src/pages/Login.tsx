import { useState, FormEvent } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });
        
        if (error) throw error;

        // If 'Confirm Email' is OFF in Supabase, we get a session immediately
        if (data.session) {
          navigate(from, { replace: true });
        } else {
          // If 'Confirm Email' is ON, we show a success message
          setMessage("Account created successfully! You can sign in after confirming your email, or check your Supabase settings to disable email verification for instant access.");
          setIsSignUp(false); // Switch to login mode so they can try signing in
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 pt-24 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="p-10 glass rounded-[3rem] border-white/10 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Zap className="w-10 h-10 text-white fill-white" />
              </div>
            </div>

            <h1 className="text-3xl font-display font-bold text-center mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-white/40 text-center mb-10 leading-relaxed">
              {isSignUp 
                ? "Join the network and start building at the edge." 
                : "Sign in to manage your high-performance infrastructure."}
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {message}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full group relative px-8 py-5 bg-indigo-600 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
                  {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium">
              <span className="text-white/40">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              </span>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {isSignUp ? "Sign In" : "Create One"}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-[10px] text-center text-white/20 uppercase tracking-widest leading-relaxed">
          By continuing, you agree to our terms of service and privacy policy. 
          Nexus infrastructure is designed for high-performance scale.
        </p>
      </motion.div>
    </div>
  );
}
