
import React from 'react';
import { MealEntry } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FoodItemCard from './FoodItemCard';

interface MealCardProps {
  meal: MealEntry;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const getMealTypeIcon = () => {
    switch (meal.mealType) {
      case 'breakfast':
        return '🍳';
      case 'lunch':
        return '🍱';
      case 'dinner':
        return '🍽️';
      case 'snack':
        return '🍎';
      default:
        return '🍴';
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">{getMealTypeIcon()}</span>
            <span className="capitalize">{meal.mealType}</span>
          </CardTitle>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>
              {new Date(meal.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="text-center p-2 rounded bg-gray-50">
            <p className="text-xs text-gray-500">Calories</p>
            <p className="font-medium text-app-primary">{meal.totalCalories}</p>
          </div>
          <div className="text-center p-2 rounded bg-gray-50">
            <p className="text-xs text-gray-500">Protein</p>
            <p className="font-medium text-app-secondary">{meal.totalProtein.toFixed(1)}g</p>
          </div>
          <div className="text-center p-2 rounded bg-gray-50">
            <p className="text-xs text-gray-500">Carbs</p>
            <p className="font-medium text-app-accent">{meal.totalCarbs.toFixed(1)}g</p>
          </div>
          <div className="text-center p-2 rounded bg-gray-50">
            <p className="text-xs text-gray-500">Fat</p>
            <p className="font-medium text-orange-500">{meal.totalFat.toFixed(1)}g</p>
          </div>
        </div>
        
        {meal.image && (
          <div className="relative mb-3 overflow-hidden rounded-md">
            <img 
              src={meal.image} 
              alt={`${meal.mealType} meal`}
              className="w-full h-32 object-cover object-center"
            />
          </div>
        )}
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Eye size={16} className="mr-1" />
              View {meal.items.length} item{meal.items.length !== 1 ? 's' : ''}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <span className="mr-2">{getMealTypeIcon()}</span>
                <span className="capitalize">{meal.mealType} Details</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {meal.items.map((item) => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MealCard;
