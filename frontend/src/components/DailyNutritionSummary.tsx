
import React from 'react';
import { DailyLog } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NutrientProgressBar from './NutrientProgressBar';
import MacroDistributionChart from './MacroDistributionChart';
import { useUser } from '@/context/UserContext';

interface DailyNutritionSummaryProps {
  dailyLog: DailyLog;
}

const DailyNutritionSummary: React.FC<DailyNutritionSummaryProps> = ({ dailyLog }) => {
  const { user } = useUser();
  
  if (!user) return null;
  
  const { dailyCalorieGoal, dailyProteinGoal, dailyCarbGoal, dailyFatGoal } = user.healthData;
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Daily Summary</CardTitle>
        <p className="text-sm text-gray-500">{today}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <NutrientProgressBar
            current={dailyLog.totalCalories}
            goal={dailyCalorieGoal}
            label="Calories"
            color="app-primary"
            unit="kcal"
          />
          <NutrientProgressBar
            current={dailyLog.totalProtein}
            goal={dailyProteinGoal}
            label="Protein"
            color="app-secondary"
          />
          <NutrientProgressBar
            current={dailyLog.totalCarbs}
            goal={dailyCarbGoal}
            label="Carbs"
            color="app-accent"
          />
          <NutrientProgressBar
            current={dailyLog.totalFat}
            goal={dailyFatGoal}
            label="Fat"
            color="orange-500"
          />
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Macronutrient Distribution</h4>
          <MacroDistributionChart
            protein={dailyLog.totalProtein}
            carbs={dailyLog.totalCarbs}
            fat={dailyLog.totalFat}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyNutritionSummary;
