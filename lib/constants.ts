type EventItem = {
    id: number;
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
  };

type Events = EventItem[];

export const events: Events = [
    { id: 1, title: "Hackathon 2024", image: "/images/event1.png", slug: 'event-1', location: 'location-1', date: 'Date-1', time: 'Time-1'  },
    { id: 2, title: "React Summit", image: "/images/event2.png", slug: 'event-2', location: 'location-2', date: 'Date-2', time: 'Time-2' },
    { id: 3, title: "Next.js Conf", image: "/images/event3.png", slug: 'event-3', location: 'location-3', date: 'Date-3', time: 'Time-3' },
    { id: 4, title: "GraphQL Meetup", image: "/images/event4.png", slug: 'event-4', location: 'location-4', date: 'Date-4', time: 'Time-4' },
    { id: 5, title: "AI Dev Conference", image: "/images/event5.png", slug: 'event-5', location: 'location-5', date: 'Date-5', time: 'Time-5' },
  ];
  