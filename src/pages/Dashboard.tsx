import { useUser, useAuth } from "@clerk/clerk-react";
import { motion } from "motion/react";
import { LayoutDashboard, Package, Settings, LogOut, Zap } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [intents, setIntents] = useState<any[]>([]);

  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`/api/my-intents/${user.id}`)
        .then(res => res.json())
        .then(data => setIntents(data));
    }
  }, [isSignedIn, user]);

  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/" />;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <div className="p-6 glass rounded-3xl mb-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={user.imageUrl} className="w-12 h-12 rounded-full border border-white/10" alt="Profile" />
              <div>
                <p className="font-bold text-sm">{user.fullName}</p>
                <p className="text-xs text-white/40">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
            <div className="h-px bg-white/5 my-4" />
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
              <Zap className="w-3 h-3 fill-current" /> Pro Plan
            </div>
          </div>

          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Package, label: "My Purchases", active: false },
            { icon: Settings, label: "Settings", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                item.active ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}

          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all mt-8"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Sign Out</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 glass rounded-[3rem]"
          >
            <h1 className="text-4xl font-display font-bold mb-8">Welcome back, {user.firstName}</h1>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Active Deployments", value: "12" },
                { label: "Total Requests", value: "1.2M" },
                { label: "Edge Locations", value: "24" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-sm text-white/40 mb-1">{stat.label}</p>
                  <p className="text-3xl font-display font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-10 glass rounded-[3rem]"
          >
            <h2 className="text-2xl font-display font-bold mb-6">Recent Purchase Intents</h2>
            {intents.length === 0 ? (
              <p className="text-white/40 italic">No purchase intents found.</p>
            ) : (
              <div className="space-y-4">
                {intents.map((intent) => (
                  <div key={intent.id} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div>
                      <p className="font-bold">Product ID: {intent.productId}</p>
                      <p className="text-xs text-white/40">{new Date(intent.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase">
                      Pending
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
