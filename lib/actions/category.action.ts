"use server";
import { Categories } from "@/database";
import connectToDatabase from "../mongodb";

export const getCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Categories.find().select("name icon").lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (e) {
    console.error("Error fetching categories:", e);
    return [];
  }
};
