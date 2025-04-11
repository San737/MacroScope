
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface NutrientProgressBarProps {
  current: number;
  goal: number;
  label: string;
  color: string;
  unit?: string;
}

const NutrientProgressBar: React.FC<NutrientProgressBarProps> = ({
  current,
  goal,
  label,
  color,
  unit = 'g'
}) => {
  const percentage = Math.min(Math.round((current / goal) * 100), 100);
  
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-500">
          {current.toFixed(1)}{unit} / {goal}{unit} ({percentage}%)
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2" 
        indicatorClassName={`bg-${color}`}
      />
    </div>
  );
};

export default NutrientProgressBar;
