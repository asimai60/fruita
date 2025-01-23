export type FruitType = 
  | 'avocado' 
  | 'banana' 
  | 'peach' 
  | 'mango' 
  | 'apple' 
  | 'plum' 
  | 'apricot' 
  | 'tomato' 
  | 'kiwi' 
  | 'pear' 
  | 'guava' 
  | 'quince';

export type RipenessStatus = 'not_ripe_yet' | 'ready_to_eat' | 'last_chance' | 'overripe';

export interface Reading {
  timestamp: Date;
  glucoseLevel: number;
}

export interface Fruit {
  id: string;
  type: FruitType;
  name: string;
  addedAt: Date;
  lastReading: number;
  readings: Reading[];
  status: RipenessStatus;
} 