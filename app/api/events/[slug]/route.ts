import { Event, IEvent } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { Route } from "next";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params : Promise<{
        slug: string;
    }>;
}
export async function GET(req: NextRequest, { params } : RouteParams){


    try{
            await connectToDatabase();

        const {slug} = await params;
        // Validate Slug Parameter
        if(!slug || typeof slug !== "string" || slug.trim() === ""){
            return NextResponse.json({message: "Invalid slug parameter"}, {status: 400}); 
        }

        // Sanitize the slug to prevent NoSQL injection
        const sanitizedSlug = slug.trim().toLowerCase();
        console.log('slug', sanitizedSlug);
        // Query event by slug
        const event : IEvent = await Event.findOne({ slug: sanitizedSlug }).lean(); // Use .lean() to get a plain JavaScript object instead of a Mongoose document
       
        if(!event){
            return NextResponse.json({message: "Event not found"}, {status: 404});
        } 

        // Return the event data as JSON
        return NextResponse.json({message: "Event retrieved successfully", event}, {status: 200});

    }catch(e){

         // Handle specific error types
            if (e instanceof Error) {
            // Handle database connection errors
            if (e.message.includes('MONGODB_URI')) {
                return NextResponse.json(
                { message: 'Database configuration error' },
                { status: 500 }
                );
            }
        }

        // Handle unexpected errors
        return NextResponse.json({message: "Failed to retrieve event", error: e instanceof Error ? e.message : "Unknown error"}, {status: 500});
    }
}
