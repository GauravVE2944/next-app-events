"use client";

import React, { useActionState, useState, useEffect } from 'react'
import Dialog from '@/components/ui/dialog'
import SuccessModal from './success-modal'
import { Ticket, AlertCircle, Loader2 } from 'lucide-react';
import { createBooking } from '@/lib/actions/booking.action';
import { useUser } from '@clerk/nextjs';

interface RegisterModalProps {
  event?: any;
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  success: false,
};

const RegisterModal = ({ event, isOpen, onClose }: RegisterModalProps) => {

  const {_id : eventId, slug, title, date} = event || {};
  const { user } = useUser();
  const [name, setName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // useActionState hook for form submission
  const [state, formAction, pending] = useActionState(createBooking, initialState);

  // Handle success state
  useEffect(() => {
    if (state.success) {
      setShowSuccessModal(true);
    }
  }, [state.success]);

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setName("");
    setEmail(user?.primaryEmailAddress?.emailAddress || "");
    onClose();
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Register for Event"
      >
        <div className="space-y-4">
          {event && (
            <>
              <div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{date}</p>
              </div>

              {/* Error State */}
              {state.error && (
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Registration Failed</p>
                    <p className="text-sm text-red-700 mt-1">{state.error}</p>
                  </div>
                </div>
              )}

              {/* Registration Form */}
              <form className="space-y-4" action={formAction}>
                {/* Hidden fields for server action */}
                <input type="hidden" name="eventId" value={eventId} />

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-900">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="e.g. John Doe"
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={pending}
                    className="w-full px-3 py-2 border border-grey-300 rounded-md text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="e.g. johndoe21@gmail.com"
                    maxLength={100}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={pending}
                    className="w-full px-3 py-2 border border-grey-300 rounded-md text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-600">
                  By registering, you agree to receive event updates and reminders via email.
                </p>

                {/* Submit Button */}
                <div className="flex gap-2 pt-2">
                  <button 
                    type="submit" 
                    disabled={pending}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    {pending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4" />
                        Register
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </Dialog>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Registration Successful!"
        message={`You have successfully registered for "${title}". A confirmation email will be sent to you shortly.`}
      />
    </>
  )
}

export default RegisterModal