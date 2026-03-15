"use client";

import React, { useState, useEffect } from 'react';
import RegisterModal from './register-modal';
import { Ticket, CheckCircle } from 'lucide-react';
import { checkUserBooking } from '@/lib/actions/booking.action';
import { useUser } from '@clerk/nextjs';

interface RegisterModalWrapperProps {
  event: any;
  bookings?: number;
}

const RegisterModalWrapper = ({ event, bookings = 0 }: RegisterModalWrapperProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  // Check if user is already registered
  useEffect(() => {
    const checkRegistration = async () => {
      if (!user?.primaryEmailAddress?.emailAddress || !event?._id) {
        setIsLoading(false);
        return;
      }

      try {
        const isRegistered = await checkUserBooking(
          user.primaryEmailAddress.emailAddress,
          event._id
        );
        setIsAlreadyRegistered(isRegistered);
      } catch (error) {
        console.error('Error checking registration:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkRegistration();
  }, [user, event]);

  if (isLoading) {
    return (
      <div className="w-full py-3 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-2">
        Loading...
      </div>
    );
  }

  return (
    <>
      {isAlreadyRegistered ? (
        // Already Registered Message
        <div className="w-full py-3 px-4 bg-green-50 border border-green-200 text-green-700 font-semibold rounded-lg flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5" />
          You are already registered
        </div>
      ) : (
        // Register Button
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Ticket className="w-5 h-5" />
          Register Now
        </button>
      )}

      {/* Modal */}
      {!isAlreadyRegistered && (
        <RegisterModal
          event={event}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Bookings Info */}
      <p className="text-sm text-grey-600 mt-3 text-center">
        {bookings > 0
          ? `Join ${bookings} people who have already registered!`
          : 'Be the first to register!'}
      </p>
    </>
  );
};

export default RegisterModalWrapper;
