import FloatingLines from "@/components/FloatingLines";
import Navbar from "@/components/Navbar";
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getEvents } from "@/lib/events";

const Home = async () => {
  const events = await getEvents();
  console.log("Fetched events:", events);

  return (
    <section className="min-h-screen">
      <div className="-z-1 h-full absolute">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={5}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.2}
          interactive={true}
          parallax={true}
        />
      </div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-center mt-10">Centralized event management</h1>
        <p className="text-center mt-1 text-gray-400!">
          Hackathons, conferences, meetups and more
        </p>
        <ExploreBtn />
        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className="events">
            {events.map((event: IEvent) => (
              <li key={event.title} className="event-card">
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
