"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ArrowRight, User, Loader2, AlertCircle } from "lucide-react";
import LoginTransition from "@/components/LoginTransition";

export default function LoginPage() {
  const { login, register, isLoading, error: authError } = useAuth();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showTransition, setShowTransition] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!username.trim() || !password.trim()) return;

    // Start transition immediately to cover network delay
    setShowTransition(true);

    let success = false;
    try {
      if (isRegistering) {
        success = await register(username, password);
      } else {
        success = await login(username, password);
      }
    } catch (err) {
      console.error(err);
      success = false;
    }

    if (success) {
      // Keep transition for a bit to let the user enjoy the warp speed
      setTimeout(() => {
        router.push("/universe");
      }, 2000);
    } else {
      // If failed, hide transition so user can see error
      // Add a small delay so it doesn't flash too instantly if api is fast
      setTimeout(() => {
        setShowTransition(false);
        // Note: authError from context will be updated by useAuth
        // But if we want to be sure, we can rely on re-render.
      }, 1000);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden bg-black text-white" suppressHydrationWarning>
      <LoginTransition show={showTransition} />

      {/* Background Stars (Placeholder) */}
      <div className="absolute inset-0 z-0 bg-[url('/stars.png')] opacity-50" suppressHydrationWarning></div>

      <div className="z-10 w-full max-w-md space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl" suppressHydrationWarning>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome to Humeen
          </h1>
          <p className="text-gray-400">
            {isRegistering ? "Create an account to start your journey." : "Enter your credentials to resume."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Username</label>
            <div className="relative">
              <User suppressHydrationWarning className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-600"
                placeholder="Explorer123"
                suppressHydrationWarning
                disabled={showTransition}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Password</label>
            <div className="relative">
              <User suppressHydrationWarning className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-600"
                placeholder="••••••••"
                suppressHydrationWarning
                disabled={showTransition}
              />
            </div>
          </div>

          {(authError || localError) && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <AlertCircle suppressHydrationWarning className="w-4 h-4" /> {authError || localError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || showTransition}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 disabled:opacity-50"
            suppressHydrationWarning
          >
            {isLoading || showTransition ? <Loader2 suppressHydrationWarning className="w-5 h-5 animate-spin" /> : (
              <>
                {isRegistering ? "Create Account" : "Login"} <ArrowRight suppressHydrationWarning className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-gray-400 hover:text-white transition-colors"
            suppressHydrationWarning
            disabled={showTransition}
          >
            {isRegistering ? "Already have an account? Login" : "New here? Create an account"}
          </button>
        </div>
      </div>
    </main>
  );
}
