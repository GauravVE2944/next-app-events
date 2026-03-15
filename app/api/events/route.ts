import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server"
import mongoose, { Mongoose } from "mongoose";

export async function POST(req: NextRequest){

    try{
        await connectToDatabase();
       console.log(mongoose.connection.readyState);
        const formData = await req.formData();

        let event;

        try{
            event  = Object.fromEntries(formData);
        }catch(e){
            return NextResponse.json({message: "Invalid form data", error: e instanceof Error ? e.message : "Unknown error"}, {status: 400});
        }
                // Validate required fields
            if (!event.title) {
                return NextResponse.json({message: "Missing required fields: title"}, {status: 400});
            }

            // To retrive the image file from the form data
            // const file = formData.get('image') as File | null;
            // if(!file){
            //     return NextResponse.json({message: "Image file is required"}, {status: 400});
            // }

             let tags = JSON.parse(formData.get('tags') as string);



            // Save the image file to the cloudinary and get the returned URL
           const createdEvent = await Event.create({
            ...event,
            tags
           });
        
            return NextResponse.json({message: "Event created successfully", event: createdEvent}, {status: 200});

    }catch(e){
        return NextResponse.json({message: "Event creation failed", error: e instanceof Error ? e.message : "Unknown error"}, {status: 500});
    }

}

export async function GET(req: NextRequest){

    await connectToDatabase();
    try{
       // const events = await Event.find().sort({createdAt: -1});
        const events =  (await Event.find()
            .select("title slug date time location image")
            .lean())
            .map(e => ({ ...e, image: e.image || null }));

        if(!events){
            return NextResponse.json({message: "No events found"}, {status: 404});
        }
        return NextResponse.json({message: "Events retrieved successfully", events}, {status: 200});
    }catch(e){
        return NextResponse.json({message: "Failed to retrieve events", error: e instanceof Error ? e.message : "Unknown error"}, {status: 500});
    }
}