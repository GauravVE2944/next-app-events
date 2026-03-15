import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { getRelatedEvents } from '@/lib/actions/event.action';
import {IEvent} from "@/database";
import EventCard from '@/components/EventCard';
import RegisterModalWrapper from './_components/register-modal-wrapper';
import { Calendar, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
interface Event {
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  overview?: string;
}

interface EventResponse {
  event: Event;
}

interface PageProps {
  params: {
    slug: string;
  };
}

interface EventDetailItemProps {
  icon: string;
  alt: string;
  label: string;
}


 const EventDetailItem = ({ icon, alt, label }: EventDetailItemProps) => {

      if(!label) return null;

      return (
      <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={20} height={20} />
        <p>{label}</p>
      </div>
      );
    }
  
 

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="tags">
        <h2>Tags</h2>
        <div className="flex-row-gap-2">
            {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
            ))}
        </div>
    </div>
)


const EventDetailPage = async ({ params }: PageProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const { slug } = await  params;

   const response = await fetch(`${BASE_URL}/api/events/${slug}`);
   const  {event } = await response.json();
   console.log('eventDetail', event)
    const {  description, image, overview, date, time, title, location, mode, agenda, audience, tags, organizer } = event;
  const bookings = 10;
   
  const imageSrc= image || "/images/thumbnail.png";
  const similarEvents :IEvent[] = await getRelatedEvents({slug});

    if(!description){
      return notFound();
    }

    console.log('tags', tags);

    const handleRegister = () => {
  setShowRegisterModal(true);
}
 return(
  <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
          {/* Left Side - Event Content */}
          <div className="content">
            <Image src={imageSrc} alt={title} width={600} height={400} className="event-image" />

            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>

              <section className="flex-col-gap-2">
                  <h2>Event Details</h2>

                  <EventDetailItem icon="/icons/calendar.svg" alt="Calendar Icon" label={new Date(date).toLocaleDateString()} />
                  <EventDetailItem icon="/icons/clock.svg" alt="Clock Icon" label={time} />
                  <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
                  <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                  <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
              </section>


                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>
        { tags && (
             <EventTags tags={tags} />
        )}
          
          </div>

          {/* Right Side - Event Content */}

          <aside className="booking-form">
            <div className="signup-card">
              <h2>Book Your Spot</h2>
              <hr className="my-6 border-gray-200" />
              <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2  text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Attendees</span>
                    </div>
                    <p className="font-semibold">
                        11 / 50
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Date</span>
                    </div>
                    <p className="font-semibold text-sm">
                     {format(date, "MMM dd" ) }
                    </p>
                </div>

                 <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Time</span>
                        </div>
                        <p className="font-semibold text-sm">
                            5:51 PM
                        </p>
                    </div>
              <RegisterModalWrapper event={event} bookings={bookings} />
            </div>
          </aside>
      </div>

       <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard key={similarEvent.title} {...similarEvent} />
                    ))}
                </div>
            </div>
    </section>
 )
 
}

export default EventDetailPage;