"use server";
import { redirect } from 'next/navigation';
import { Event } from "@/database";
import connectToDatabase from "../mongodb";
import { eventSchema, EventInput } from "../schemas/event.schema";

export const getRelatedEvents = async({slug}: {slug: string}) => {
    try{
        await connectToDatabase();
        const event = await Event.findOne({slug});
        if(!event){
            return [];
        }
        // For demonstration, we will return events with the same tags as similar events
       return await Event.find({_id : {$ne : event._id}, tags : {$in: event.tags}}).lean();
    }catch(e){
        console.error("Error fetching similar events:", e); 
        return [];
    }
}

export const createEvent = async (prev: any, formData: FormData) => {

   const tagsString = formData.get("tags");
   const tags = tagsString ? JSON.parse(tagsString as string) : [];

   const values = {
      title: formData.get("title"),
      description: formData.get("description"),
      overview: formData.get("overview"),
       date: formData.get("date"),
      time: formData.get("time"),
      venue: formData.get("venue"),
      location: formData.get("location"),
      tags: tags,
      category: formData.get("category")
  };
console.log('data', values)
    const result = eventSchema.safeParse(values);


    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
        values
      };
    }

  try {
    await connectToDatabase();

    const event = new Event(result.data);
    await event.save();

    redirect('/events');
  } catch (error) {
    // Re-throw redirect errors so they work properly
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    
    return {
      success: false,
      message:  `Failed to create event ${error}`
    };
  }

};


  export const searchEvents = async (query: string) => {
    try {
      await connectToDatabase();

      const events = await Event.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
        ]
      })
      .select('title slug overview image date venue location category')
      .limit(5)
      .lean();

      return JSON.parse(JSON.stringify(events));
    } catch (e) {
      console.error("Error searching events:", e);
      return [];
    }
  }