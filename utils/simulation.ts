import { useFruitStore } from '../store/fruitStore';
import { RIPENESS_THRESHOLDS } from '../store/fruitStore';

export const startSimulation = () => {
  const updateFruitReading = useFruitStore.getState().updateFruitReading;

  // Update readings every 3 seconds (instead of 15)
  const interval = setInterval(() => {
    const fruits = useFruitStore.getState().fruits;
    fruits.forEach(fruit => {
      const thresholds = RIPENESS_THRESHOLDS[fruit.type];
      
      // Simulate faster and more noticeable glucose level changes
      const currentLevel = fruit.lastReading;
      const maxLevel = thresholds.overripe.max;
      
      // Larger random increment between 1 and 4
      const increment = 1 + (Math.random() * 3);
      
      // Add some variation - occasionally decrease slightly
      const change = Math.random() > 0.8 ? -increment/2 : increment;
      
      // Ensure we stay within bounds (0 to maxLevel)
      const newLevel = Math.max(0, Math.min(currentLevel + change, maxLevel));
      
      updateFruitReading(fruit.id, newLevel);
    });
  }, 3000); // 3 seconds

  return () => clearInterval(interval);
}; 