"use client";
import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 to-sky-400 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white transition"
          />

          <input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white transition"
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white transition"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full mt-6 py-3 rounded-lg bg-white text-black font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="grow h-px bg-white/30"></div>
          <span className="px-3 text-white/70 text-sm">OR</span>
          <div className="grow h-px bg-white/30"></div>
        </div>

        {/* Social Signup */}
        <button
          className="w-full py-3 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-white/70 text-sm mt-6">
          Already have an account?{" "}
          <span className="underline cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}