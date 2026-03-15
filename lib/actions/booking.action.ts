"use server";
import { Booking } from "@/database";
import connectToDatabase from "../mongodb";

interface BookingState {
  success: boolean;
  message?: string;
  error?: string;
  booking?: any;
}

const initialState: BookingState = {
  success: false,
};

export const createBooking = async (
  prevState: BookingState,
  formData: FormData
): Promise<BookingState> => {
  try {
    const email = formData.get("email") as string;
    const eventId = formData.get("eventId") as string;

    if (!email || !eventId) {
      return {
        success: false,
        error: "Email and Event ID are required",
      };
    }

    await connectToDatabase();
    console.log("Creating booking for:", email, eventId);

    const booking = await Booking.create({
      email,
      eventId,
    });

    const bookingRes = JSON.parse(JSON.stringify(booking));

    return {
      success: true,
      message: "New booking created successfully",
      booking: bookingRes,
    };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    console.error("Booking creation error:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const checkUserBooking = async (email: string, eventId: string): Promise<boolean> => {
  try {
    await connectToDatabase();
    
    const booking = await Booking.findOne({
      email,
      eventId,
    });

    return !!booking;
  } catch (e) {
    console.error("Error checking booking:", e);
    return false;
  }
};;


