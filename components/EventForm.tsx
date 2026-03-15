"use client";
import Image from 'next/image';
import React, { useActionState, useState } from 'react';

import { eventSchema } from '@/lib/schemas/event.schema';
import { createEvent } from '@/lib/actions/event.action';


const initialState = {
  errors: {},
  values: {},
  success: false,
};

const EventForm = ({ categories: initialCategories }: { categories: { _id: string; name: string; icon: string }[] }) => {
    const [state, formAction, pending] = useActionState(createEvent, initialState);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  
  const [fieldData, setFieldData] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<{ _id: string; name: string; icon: string }[]>(initialCategories);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  // Tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");


  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
      setFieldErrors((prev) => ({ ...prev, tags: "" }));
    }
  };

  const handleChange = (key, val) => {
    setFieldData((prev) => ({...prev, [key]: val}));
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
    <form action={formAction}>
        {/* Title */}
        <div className="field">
          <label htmlFor="title">Event Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="e.g. React Summit 2026"
            maxLength={100}
            defaultValue={state.values?.title || ""}
          />
          {state?.errors?.title && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.title[0]}
          </p>
        )}
        </div>
         {/* Description */}
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your event in detail..."
            maxLength={1000}
            rows={4}
            defaultValue={state.values?.description || ""}
          />
          {state?.errors?.description && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.description[0]}
            </p>
          )}
        </div>

        {/* Overview */}
        <div className="field">
          <label htmlFor="overview">Overview</label>
          <textarea
            id="overview"
            name="overview"
            placeholder="Brief overview of the event..."
            maxLength={500}
            rows={3}
            defaultValue={state?.values?.overview || ""}
          />
          {state?.errors?.overview && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.overview[0]}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            defaultValue={state.values.date || ""}
          />
          {state?.errors?.date && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.date[0]}
            </p>
          )}
        </div>

        {/* Time */}
        <div className="field">
          <label htmlFor="time">Time</label>
          <input
            id="time"
            type="time"
            name="time"
            defaultValue={state.values.time || ""}
          />
          {state?.errors?.time && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.time[0]}
            </p>
          )}
        </div>

        {/* Venue */}
        <div className="field">
          <label htmlFor="venue">Venue</label>
          <input
            id="venue"
            type="text"
            name="venue"
            placeholder="Event venue name..."
            maxLength={100}
            defaultValue={state.values?.venue || ""}
          />
          {state?.errors?.venue && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.venue[0]}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="City, Country or URL for online events..."
            maxLength={200}
            defaultValue={fieldData.location || ""}
          />
          {state?.errors?.location && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.location[0]}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category"  defaultValue={state.values?.category || ""}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {state?.errors?.category && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.category[0]}
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="field">
          <label htmlFor="tagInput">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              id="tagInput"
              type="text"
              name="tagInput"
              defaultValue={state.values?.tagInput || ''}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Add a tag and press Enter..."
              maxLength={50}
            />
            <button type="button" onClick={addTag} className="btn-secondary">
              Add
            </button>
          </div>
          <input type="hidden" name="tags" value={JSON.stringify(tags)} />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {state?.errors?.tags && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.tags[0]}
            </p>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn-submit" disabled={pending}>
          {pending ? "Creating Event..." : "Create Event"}
        </button>
      </form>
      </div>
  )
}

export default EventForm