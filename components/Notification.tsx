'use client';

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { create } from 'zustand';

interface NotificationStore {
  show: boolean;
  message: string;
  type: 'success' | 'warning';
  showNotification: (message: string, type: 'success' | 'warning') => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  show: false,
  message: '',
  type: 'success',
  showNotification: (message, type) => {
    set({ show: true, message, type });
    setTimeout(() => set({ show: false }), 3000);
  },
}));

export default function Notification() {
  const { show, message, type } = useNotificationStore();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-4">
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {type === 'success' ? (
                  <CheckCircleIcon className="h-6 w-6 text-primary" />
                ) : (
                  <ExclamationTriangleIcon className="h-6 w-6 text-warning" />
                )}
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
} 