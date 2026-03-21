import Navbar from "@/components/Navbar";
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradientAnimation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// import { getEvents } from "@/lib/events";
async function getEventsData() {
  const res = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store",
  });
  console.log("API response status:", res);

  const data = await res.json();
  return data.events;
}
const Home = async () => {
  const events = await getEventsData();
  console.log("Fetched events:", events);

  return (
    <div className="min-h-screen w-full">
      <div className="-z-1 h-full w-full absolute">
        <BackgroundGradientAnimation>
          <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-center">
            <p className="bg-clip-text text-transparent text-3xl not-[]:md:text-4xl lg:text-7xl drop-shadow-2xl bg-linear-to-b from-white/80 to-white/20">
              Centralized event management
            </p>
            <p className="text-center mt-1 mb-20 text-gray-400!">
              Hackathons, conferences, meetups and more
            </p>
            <ExploreBtn />
          </div>
        </BackgroundGradientAnimation>
      </div>
      <Navbar />
      <div className="mt-[100vh] p-10">
        <div className="mt-20 space-y-7">
          <h1 className="text-2xl font-bold">Featured Events</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: IEvent) => (
              <li key={event.title} className="">
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
