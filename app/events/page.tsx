import CategoryFilter from "@/components/CategoryFilter";
import { IEvent } from "@/database";

export default async function EventsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/events`);

  if (!response.ok) {
    return (
      <p className="text-center text-red-500">
        Failed to load events. Please try again later.
      </p>
    );
  }

  const { events }: { events: IEvent[] } = await response.json();

  // Build category list with event counts
  const categoryCountMap: Record<string, number> = {};
  events?.forEach((event: IEvent) => {
    event.tags?.forEach((tag) => {
      categoryCountMap[tag] = (categoryCountMap[tag] || 0) + 1;
    });
  });
  const categories = Object.keys(categoryCountMap);

  return (
    <section>
      <h1>Events</h1>
      <p className="mt-2 text-lg text-gray-300">
        Explore upcoming hackathons, conferences, meetups, and more.
      </p>

      <CategoryFilter
        events={events || []}
        categories={categories}
        categoryCounts={categoryCountMap}
      />
    </section>
  );
}
