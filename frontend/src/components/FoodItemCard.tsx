
import React from 'react';
import { FoodItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface FoodItemCardProps {
  item: FoodItem;
  onRemove?: () => void;
  showConfidence?: boolean;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ 
  item, 
  onRemove,
  showConfidence = false
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.portion}</p>
          </div>
          {onRemove && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-500 hover:text-app-primary" 
              onClick={onRemove}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
        
        {showConfidence && item.confidence && (
          <div className="mt-1 mb-2">
            <Badge variant="outline" className="bg-gray-50">
              Confidence: {Math.round(item.confidence * 100)}%
            </Badge>
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-2 mt-2">
          <div className="text-center p-1 rounded bg-gray-50">
            <p className="text-xs text-gray-500">Calories</p>
            <p className="font-medium text-app-primary">{item.calories}</p>
          </div>
          <div className="text-center p-1 rounded bg-gray-50">
            <p className="text-xs text-gray-500">Protein</p>
            <p className="font-medium text-app-secondary">{item.protein}g</p>
          </div>
          <div className="text-center p-1 rounded bg-gray-50">
            <p className="text-xs text-gray-500">Carbs</p>
            <p className="font-medium text-app-accent">{item.carbs}g</p>
          </div>
          <div className="text-center p-1 rounded bg-gray-50">
            <p className="text-xs text-gray-500">Fat</p>
            <p className="font-medium text-orange-500">{item.fat}g</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodItemCard;
