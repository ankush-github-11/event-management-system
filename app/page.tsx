import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getEventsData() {
  const res = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.events;
}

const Home = async () => {
  const events = await getEventsData();

  return (
    <div className="min-h-screen w-full text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center bg-linear-to-br bg- from-pink-500 to-green-500 px-6 overflow-hidden">
        

        <div className="relative text-center max-w-2xl">
          
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Centralized Event Management
          </h1>

          <p className="mt-4 text-lg text-white/80">
            Hackathons, conferences, meetups and more — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          

            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl border border-white/40 hover:bg-white/20 transition"
            >
              Sign Up
            </Link>

          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="p-6 md:p-12 bg-black text-white">
        
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Events 🚀
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: IEvent) => (
              <li
                key={event.title}
                className="transform hover:scale-105 transition duration-300"
              >
                <EventCard {...event} />
              </li>
            ))}
          </ul>

        </div>
      </section>
    </div>
  );
};

export default Home;