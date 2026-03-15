import { Category } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().select("name icon").lean();

    return NextResponse.json(
      { message: "Categories retrieved successfully", categories },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Failed to retrieve categories",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
