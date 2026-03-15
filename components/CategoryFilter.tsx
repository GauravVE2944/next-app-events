"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { IEvent } from "@/database";

interface Props {
  events: IEvent[];
  categories: string[];
  categoryCounts: Record<string, number>;
}

const CategoryFilter = ({ events, categories, categoryCounts }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? events.filter((event) => event.tags?.includes(selected))
    : events;

  return (
    <>
      {/* Category List Grid */}
      <div className="mt-10 space-y-5">
        <h3>Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(selected === category ? null : category)}
              className={`flex flex-col items-center gap-1 rounded-lg border p-4 capitalize transition-colors ${
                selected === category
                  ? "bg-primary text-dark-100 border-primary"
                  : "border-dark-200 bg-dark-100 text-white hover:border-primary"
              }`}
            >
              <span className="text-sm font-semibold">{category}</span>
              <span className="text-xs opacity-70">
                {categoryCounts[category]} {categoryCounts[category] === 1 ? "event" : "events"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Pills */}
      <div className="mt-10 space-y-5">
        <h3>Browse by Category</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelected(null)}
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              selected === null
                ? "bg-primary text-dark-100 border-primary"
                : "border-dark-200 bg-dark-100 text-white hover:border-primary"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`rounded-full border px-5 py-2 text-sm capitalize transition-colors ${
                selected === category
                  ? "bg-primary text-dark-100 border-primary"
                  : "border-dark-200 bg-dark-100 text-white hover:border-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-7">
        <h3>All Events</h3>
        {filtered.length > 0 ? (
          <ul className="events">
            {filtered.map((event: IEvent) => (
              <li key={event.slug} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-light-200">No events found in this category.</p>
        )}
      </div>
    </>
  );
};

export default CategoryFilter;
