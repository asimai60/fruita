'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FruitType } from '../types';
import { useFruitStore } from '../store/fruitStore';

interface AddFruitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fruitOptions: { type: FruitType; emoji: string }[] = [
  { type: 'avocado', emoji: '🥑' },
  { type: 'banana', emoji: '🍌' },
  { type: 'peach', emoji: '🍑' },
  { type: 'mango', emoji: '🥭' },
  { type: 'apple', emoji: '🍎' },
  { type: 'plum', emoji: '🍑' },
  { type: 'apricot', emoji: '🍊' },
  { type: 'tomato', emoji: '🍅' },
  { type: 'kiwi', emoji: '🥝' },
  { type: 'pear', emoji: '🍐' },
  { type: 'guava', emoji: '🍈' },
  { type: 'quince', emoji: '🍐' },
];

export default function AddFruitModal({ isOpen, onClose }: AddFruitModalProps) {
  const [selectedType, setSelectedType] = useState<FruitType | null>(null);
  const [name, setName] = useState('');
  const addFruit = useFruitStore(state => state.addFruit);

  const handleSubmit = () => {
    if (selectedType && name) {
      addFruit(selectedType, name);
      setSelectedType(null);
      setName('');
      onClose();
    }
  };

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
                  Add New Fruit
                </Dialog.Title>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Fruit Type
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {fruitOptions.map(({ type, emoji }) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`p-4 rounded-lg border-2 ${
                            selectedType === type
                              ? 'border-primary'
                              : 'border-gray-200'
                          }`}
                        >
                          <span className="text-2xl">{emoji}</span>
                          <p className="text-sm mt-1 capitalize">{type}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter fruit name"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedType || !name}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md disabled:opacity-50"
                    >
                      Add Fruit
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 