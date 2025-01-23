'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Fruit } from '../types';
import { format } from 'date-fns';
import FruitGraph from './FruitGraph';

interface FruitHistoryProps {
  fruit: Fruit;
  isOpen: boolean;
  onClose: () => void;
}

export default function FruitHistory({ fruit, isOpen, onClose }: FruitHistoryProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium mb-4">
                  {fruit.name} History
                </Dialog.Title>

                <div className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Glucose Level Trend</h3>
                    <FruitGraph readings={fruit.readings} fruitType={fruit.type} />
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {fruit.readings.map((reading, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b"
                      >
                        <span className="text-sm text-gray-500">
                          {format(new Date(reading.timestamp), 'MMM d, h:mm a')}
                        </span>
                        <span className="font-medium">
                          {reading.glucoseLevel.toFixed(1)}% glucose
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 