"use client";

import React from 'react';
import Dialog from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  title = "Registration Successful!",
  message = "You have successfully registered for the event. A confirmation email will be sent to you shortly."
}: SuccessModalProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600 mt-2">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </Dialog>
  );
};

export default SuccessModal;
