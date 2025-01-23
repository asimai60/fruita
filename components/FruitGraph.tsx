'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { Reading, FruitType } from '../types';
import { format } from 'date-fns';
import { RIPENESS_THRESHOLDS } from '../store/fruitStore';

interface FruitGraphProps {
  readings: Reading[];
  fruitType: FruitType;
}

export default function FruitGraph({ readings, fruitType }: FruitGraphProps) {
  const data = readings.map(reading => ({
    time: format(new Date(reading.timestamp), 'HH:mm'),
    value: reading.glucoseLevel
  }));

  const thresholds = RIPENESS_THRESHOLDS[fruitType];
  const maxValue = Math.max(thresholds.overripe.max, ...readings.map(r => r.glucoseLevel));

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <XAxis 
            dataKey="time" 
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            domain={[0, maxValue + 2]}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const value = payload[0]?.value;
                if (typeof value !== 'number') return null;
                
                let status = 'Not ripe yet';
                if (value > thresholds.readyToEat.min) status = 'Ready to eat';
                if (value > thresholds.lastChance.min) status = 'Last chance';
                if (value > thresholds.lastChance.max) status = 'Overripe';
                
                return (
                  <div className="bg-white p-2 shadow-lg rounded-lg border">
                    <p className="text-sm font-medium">{value}% glucose</p>
                    <p className="text-xs text-gray-500">{status}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          
          {/* Ripeness zones */}
          <ReferenceArea
            y1={thresholds.notRipe.min}
            y2={thresholds.notRipe.max}
            fill="#f3f4f6"
            fillOpacity={0.3}
          />
          <ReferenceArea
            y1={thresholds.readyToEat.min}
            y2={thresholds.readyToEat.max}
            fill="#4CAF50"
            fillOpacity={0.3}
          />
          <ReferenceArea
            y1={thresholds.lastChance.min}
            y2={thresholds.lastChance.max}
            fill="#FFC107"
            fillOpacity={0.3}
          />
          
          {/* Add overripe zone */}
          <ReferenceArea
            y1={thresholds.lastChance.max}
            y2={thresholds.overripe.max}
            fill="#F44336"
            fillOpacity={0.3}
          />
          
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#4CAF50" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 