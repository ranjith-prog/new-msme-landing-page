import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  useEffect(() => {
    // Supabase JS handles the hash/query parameters automatically 
    // when getSession or onAuthStateChange is called.
    // However, if we're using popups, we want to signal the parent 
    // and then close the window.
    
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error.message);
      }

      if (session) {
        if (window.opener) {
          window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
          window.close();
        } else {
          // Fallback if not in a popup
          window.location.href = '/dashboard';
        }
      }
    };

    checkSession();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-display font-bold mb-2">Authenticating...</h1>
        <p className="text-white/40">Please wait while we complete your sign in.</p>
      </div>
    </div>
  );
}
