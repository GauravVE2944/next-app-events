import React from "react";
import EventForm from "@/components/EventForm";
import { getCategories } from "@/lib/actions/category.action";
import Image from "next/image";

const AddEvent = async () => {
  const categories = await getCategories() || [];

  return (
    <section id="add-event">
      <h1>Create Event</h1>

      <p className="text-light-100 mt-2">
        Fill in the details below to list your event.
      </p>

      <EventForm categories={categories} />
    </section>
  );
};

export default AddEvent;