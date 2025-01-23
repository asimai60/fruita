'use client';

import { useFruitStore } from '../store/fruitStore';
import FruitCard from './FruitCard';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function FruitList() {
  const { fruits, removeFruit } = useFruitStore();

  // Force re-render when store updates
  useEffect(() => {
    const unsubscribe = useFruitStore.subscribe(() => {
      // This will trigger a re-render when fruits change
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {fruits.map((fruit) => (
          <FruitCard
            key={fruit.id}
            fruit={fruit}
            onRemove={removeFruit}
          />
        ))}
      </AnimatePresence>
      
      {fruits.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No fruits added yet. Tap the + button to add a fruit.
        </div>
      )}
    </div>
  );
} 