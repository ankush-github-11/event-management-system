"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 to-sky-400 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white transition"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 py-3 rounded-lg bg-white text-black font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          Login
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="grow h-px bg-white/30"></div>
          <span className="px-3 text-white/70 text-sm">OR</span>
          <div className="grow h-px bg-white/30"></div>
        </div>

        {/* Social Login */}
        <button
          onClick={() => signIn("google")}
          className="w-full py-3 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-white/70 text-sm mt-6">
          Don’t have an account? <span className="underline cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
}