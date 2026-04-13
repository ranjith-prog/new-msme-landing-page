import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function MissingKey() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full p-10 glass rounded-[3rem] border-indigo-500/20 text-center">
        <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3y-3.5z"/></svg>
        </div>
        <h1 className="text-2xl font-display font-bold mb-4">Setup Required</h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          To enable authentication and purchase features, please add your 
          <code className="mx-1 px-2 py-0.5 bg-white/10 rounded text-indigo-300">VITE_CLERK_PUBLISHABLE_KEY</code> 
          to the <strong>Secrets</strong> panel in AI Studio.
        </p>
        <a 
          href="https://dashboard.clerk.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all"
        >
          Get Clerk Key
        </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    ) : (
      <MissingKey />
    )}
  </StrictMode>,
);
