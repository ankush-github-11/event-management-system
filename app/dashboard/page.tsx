// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { type IUser } from "@/database/user.model";

export default function Dashboard() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    fetch("/api/user/")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary to-secondary p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src={user.avatar || "/default.png"}
            alt={`${user.name}'s profile picture`}
            width={112}
            height={112}
            className="rounded-full border-4 border-primary"
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user.name}
            </h1>
            <p className="text-gray-500">@{user.username}</p>
            <p className="mt-2 text-gray-600">{user.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          <div className="bg-primary text-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Events Created</h2>
            <p className="text-3xl mt-2">
              {/* {user.eventsCreated.length || 0} */}
            </p>
          </div>

          <div className="bg-secondary text-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Participated</h2>
            <p className="text-3xl mt-2">
              {/* {user.eventsParticipated.length || 0} */}
            </p>
          </div>

          <div className="bg-gray-800 text-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Status</h2>
            <p className="text-xl mt-2">
              {user.isVerified ? "Verified ✅" : "Not Verified ❌"}
            </p>
          </div>

        </div>

        {/* Additional Info */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-gray-700">Email</h3>
            <p>{user.email}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-gray-700">Role</h3>
            <p>{user.role}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-gray-700">Last Login</h3>
            <p>
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-gray-700">Joined</h3>
            <p>
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}