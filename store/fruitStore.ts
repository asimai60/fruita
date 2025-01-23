import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Fruit, Reading, RipenessStatus, FruitType } from '../types';

interface FruitStore {
  fruits: Fruit[];
  addFruit: (type: FruitType, name: string) => void;
  removeFruit: (id: string) => void;
  updateFruitReading: (id: string, reading: number) => void;
}

export const RIPENESS_THRESHOLDS = {
  avocado: {
    notRipe: { min: 0, max: 10 },
    readyToEat: { min: 10, max: 15 },
    lastChance: { min: 15, max: 20 },
    overripe: { min: 20, max: 25 }
  },
  banana: {
    notRipe: { min: 0, max: 15 },
    readyToEat: { min: 15, max: 20 },
    lastChance: { min: 20, max: 25 },
    overripe: { min: 25, max: 30 }
  },
  peach: {
    notRipe: { min: 0, max: 12 },
    readyToEat: { min: 12, max: 18 },
    lastChance: { min: 18, max: 25 },
    overripe: { min: 25, max: 30 }
  },
  mango: {
    notRipe: { min: 0, max: 14 },
    readyToEat: { min: 14, max: 19 },
    lastChance: { min: 19, max: 24 },
    overripe: { min: 24, max: 29 }
  },
  apple: {
    notRipe: { min: 0, max: 10 },
    readyToEat: { min: 10, max: 14 },
    lastChance: { min: 14, max: 18 },
    overripe: { min: 18, max: 22 }
  },
  plum: {
    notRipe: { min: 0, max: 11 },
    readyToEat: { min: 11, max: 16 },
    lastChance: { min: 16, max: 20 },
    overripe: { min: 20, max: 24 }
  },
  apricot: {
    notRipe: { min: 0, max: 9 },
    readyToEat: { min: 9, max: 13 },
    lastChance: { min: 13, max: 17 },
    overripe: { min: 17, max: 21 }
  },
  tomato: {
    notRipe: { min: 0, max: 8 },
    readyToEat: { min: 8, max: 12 },
    lastChance: { min: 12, max: 15 },
    overripe: { min: 15, max: 18 }
  },
  kiwi: {
    notRipe: { min: 0, max: 13 },
    readyToEat: { min: 13, max: 17 },
    lastChance: { min: 17, max: 21 },
    overripe: { min: 21, max: 25 }
  },
  pear: {
    notRipe: { min: 0, max: 11 },
    readyToEat: { min: 11, max: 15 },
    lastChance: { min: 15, max: 19 },
    overripe: { min: 19, max: 23 }
  },
  guava: {
    notRipe: { min: 0, max: 12 },
    readyToEat: { min: 12, max: 16 },
    lastChance: { min: 16, max: 20 },
    overripe: { min: 20, max: 24 }
  },
  quince: {
    notRipe: { min: 0, max: 9 },
    readyToEat: { min: 9, max: 14 },
    lastChance: { min: 14, max: 18 },
    overripe: { min: 18, max: 22 }
  }
};

const calculateRipenessStatus = (type: FruitType, glucoseLevel: number): RipenessStatus => {
  const thresholds = RIPENESS_THRESHOLDS[type];
  
  if (glucoseLevel <= thresholds.notRipe.max) return 'not_ripe_yet';
  if (glucoseLevel <= thresholds.readyToEat.max) return 'ready_to_eat';
  if (glucoseLevel <= thresholds.lastChance.max) return 'last_chance';
  return 'overripe';
};

export const useFruitStore = create(
  persist<FruitStore>(
    (set, get) => ({
      fruits: [],
      addFruit: (type, name) => {
        const newFruit: Fruit = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          name,
          addedAt: new Date(),
          lastReading: 0,
          readings: [],
          status: 'not_ripe_yet' as RipenessStatus
        };
        set((state) => ({
          fruits: [...state.fruits, newFruit]
        }));
        setTimeout(() => {
          const fruit = get().fruits.find(f => f.id === newFruit.id);
          if (fruit) {
            const thresholds = RIPENESS_THRESHOLDS[fruit.type];
            const initialReading = thresholds.notRipe.min + Math.random() * 2;
            get().updateFruitReading(fruit.id, initialReading);
          }
        }, 0);
      },
      removeFruit: (id) => set((state) => ({
        fruits: state.fruits.filter(fruit => fruit.id !== id)
      })),
      updateFruitReading: (id, reading) => set((state) => ({
        fruits: state.fruits.map(fruit => {
          if (fruit.id === id) {
            const newReadings = [...fruit.readings, {
              timestamp: new Date(),
              glucoseLevel: reading
            }];
            const newStatus = calculateRipenessStatus(fruit.type, reading);
            return {
              ...fruit,
              lastReading: reading,
              readings: newReadings,
              status: newStatus
            };
          }
          return fruit;
        })
      }))
    }),
    {
      name: 'fruit-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Handle migration from version 0 to 1
          return {
            ...persistedState,
            fruits: persistedState.fruits || []
          };
        }
        return persistedState as FruitStore;
      },
    }
  )
); 