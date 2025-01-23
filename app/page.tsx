'use client';

import { useState, useEffect } from 'react';
import PhoneFrame from '../components/PhoneFrame';
import FruitList from '../components/FruitList';
import AddFruitModal from '../components/AddFruitModal';
import Notification from '../components/Notification';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { startSimulation } from '../utils/simulation';
import { useFruitStore } from '../store/fruitStore';
import { useNotificationStore } from '../components/Notification';

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const showNotification = useNotificationStore(state => state.showNotification);
  const fruits = useFruitStore(state => state.fruits);

  // Monitor fruits for status changes
  useEffect(() => {
    const prevStatus = new Map(fruits.map(f => [f.id, f.status]));
    
    const unsubscribe = useFruitStore.subscribe((state) => {
      const newFruits = state.fruits;
      newFruits.forEach(fruit => {
        const oldStatus = prevStatus.get(fruit.id);
        if (oldStatus && oldStatus !== fruit.status) {
          showNotification(
            `${fruit.name} is now ${fruit.status.replace(/_/g, ' ')}!`,
            fruit.status === 'last_chance' ? 'warning' : 'success'
          );
        }
        prevStatus.set(fruit.id, fruit.status);
      });
    });

    return () => unsubscribe();
  }, [showNotification, fruits]);

  useEffect(() => {
    const stopSimulation = startSimulation();
    return () => stopSimulation();
  }, []);

  return (
    <>
      <PhoneFrame>
        <div className="relative h-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Products</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <PlusCircleIcon className="h-8 w-8" />
            </button>
          </div>

          <FruitList />

          <AddFruitModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        </div>
      </PhoneFrame>
      <Notification />
    </>
  );
}
