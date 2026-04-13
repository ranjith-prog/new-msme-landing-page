import { Zap, Github, Twitter, Linkedin } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: ["Features", "Security", "Enterprise", "Pricing", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Guides", "API Reference", "Community", "Open Source"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Customers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookie Policy", "Security Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">MSME tools</span>
            </div>
            <p className="text-white/40 max-w-xs mb-8 leading-relaxed">
              The intelligent infrastructure platform for modern engineering teams. 
              Build, deploy, and scale with confidence.
            </p>
            <div className="flex items-center gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
                {group.title}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
          <p className="text-sm text-white/20">
            © 2026 MSME tools Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Systems Operational</span>
            </div>
            <p className="text-sm text-white/20">
              Built with <span className="text-white/40">Nexus AI</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
