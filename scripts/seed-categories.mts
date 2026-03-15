import dotenv from "dotenv";
import path from "path";

// Load .env.local BEFORE any module that reads process.env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const defaultCategories = [
  { name: "Music", icon: "/icons/categories/music.svg" },
  { name: "Travel", icon: "/icons/categories/travel.svg" },
  { name: "Technology", icon: "/icons/categories/technology.svg" },
  { name: "Art & Culture", icon: "/icons/categories/art-culture.svg" },
  { name: "Food & Drink", icon: "/icons/categories/food-drink.svg" },
  { name: "Gaming", icon: "/icons/categories/gaming.svg" },
  { name: "Sports & Fitness", icon: "/icons/categories/sports-fitness.svg" },
  { name: "Business", icon: "/icons/categories/business.svg" },
  { name: "Education", icon: "/icons/categories/education.svg" },
  { name: "Health & Wellness", icon: "/icons/categories/health-wellness.svg" },
];

async function seed() {
  // Dynamic imports so dotenv.config() runs first
  const { default: connectToDatabase } = await import("@/lib/mongodb");
  const { default: Categories } = await import("@/database/categories.model");
  const { default: mongoose } = await import("mongoose");

  try {
    await connectToDatabase();

    const existing = await Categories.countDocuments();
    if (existing > 0) {
      console.log(
        `Categories collection already has ${existing} documents. Skipping seed.`
      );
      console.log("To re-seed, drop the collection first:");
      console.log("  db.categories.drop()");
      await mongoose.disconnect();
      return;
    }

    const result = await Categories.insertMany(defaultCategories);
    console.log(`Seeded ${result.length} categories successfully:`);
    result.forEach((cat: any) => console.log(`  - ${cat.name} (${cat.icon})`));

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
