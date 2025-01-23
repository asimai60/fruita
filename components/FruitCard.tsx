'use client';

import { Fruit } from '../types';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FruitHistory from './FruitHistory';
import LoadingSpinner from './LoadingSpinner';

interface FruitCardProps {
  fruit: Fruit;
  onRemove: (id: string) => void;
}

const statusColors = {
  not_ripe_yet: 'bg-gray-200 text-gray-700',
  ready_to_eat: 'bg-primary text-white',
  last_chance: 'bg-warning text-gray-900',
  overripe: 'bg-danger text-white'
};

const statusIcons = {
  not_ripe_yet: '⏳',
  ready_to_eat: '✅',
  last_chance: '⚠️',
  overripe: '❌'
};

const fruitEmojis = {
  avocado: '🥑',
  banana: '🍌',
  peach: '🍑',
  mango: '🥭',
  apple: '🍎',
  plum: '🍑',
  apricot: '🍊',
  tomato: '🍅',
  kiwi: '🥝',
  pear: '🍐',
  guava: '🍈',
  quince: '🍐'
};

export default function FruitCard({ fruit, onRemove }: FruitCardProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    const timeout = setTimeout(() => setIsUpdating(false), 1000);
    return () => clearTimeout(timeout);
  }, [fruit.lastReading]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative bg-white rounded-xl shadow-md p-4 mb-3 cursor-pointer"
        onClick={() => setShowHistory(true)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{fruitEmojis[fruit.type]}</span>
            <span className="font-medium">{fruit.name}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(fruit.id);
            }}
            className="text-gray-400 hover:text-danger transition-colors"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mt-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[fruit.status]}`}>
            {statusIcons[fruit.status]} {fruit.status.replace(/_/g, ' ')}
          </span>
        </div>
        
        <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
          Last reading: {fruit.lastReading}% glucose
          {isUpdating && <LoadingSpinner />}
        </div>
      </motion.div>
      
      <FruitHistory
        fruit={fruit}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </>
  );
} 