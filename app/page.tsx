import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { events } from "@/lib/constants";
import Image from "next/image";

export default async function Home() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/events`);
  if (!response.ok) {
    return <p className="text-center text-red-500">Failed to load events. Please try again later.</p>;
  }
  const { events } = await response.json();


  return (
    <section>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">Discover & <br/> create amazing events.</h1>
          <p className="mt-4 text-lg text-gray-300">
            Whether you're hosting or attending, Dev Event makes every event memorable. Join our community today.
          </p>
          <ExploreBtn />

        </div>
        <div className="flex items-center justify-center w-full">
          <Image
            src="/images/hero.gif"
            alt="Dev Event Hero"
            width={600}
            height={400}
            className="object-contain rounded-lg w-full h-auto"
            priority
            unoptimized
          />
        </div>
      </div>
      
      
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
        {events && events.length > 0 && events.map((event: IEvent) => (
         <li key={event.title } className="list-none">        
          <EventCard {...event} />
         </li>
        ))}
      </ul>
      </div>
      </section>
  );
}
