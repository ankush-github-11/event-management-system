import FloatingLines from '@/components/FloatingLines';
import Navbar from '@/components/Navbar';
import ExploreBtn from '@/components/ExploreBtn';
const Home = () => {
  return (
    <div className="min-h-screen">
      <div className='w-full h-full absolute'>
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
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
      <h1 className="text-center mt-10">Centralized event management</h1>
      <p className="text-center mt-1 text-gray-400!">Hackathons, conferences, meetups and more</p>
      <ExploreBtn />
      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {[1, 2, 3, 4, 5].map((event) => (
            <li key={event} className='event-card'>
              <h4>Event {event}</h4>
              <p>Brief description of Event {event}.</p>
            </li>
           ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Home
