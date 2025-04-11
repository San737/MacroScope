
import React from 'react';
import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User as UserIcon, Activity, Target } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { healthData } = user;
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-app-primary text-white flex items-center justify-center mr-3">
            <UserIcon size={20} />
          </div>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium">{healthData.age} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium capitalize">{healthData.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Weight</p>
            <p className="font-medium">{healthData.weight} kg</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Height</p>
            <p className="font-medium">{healthData.height} cm</p>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="mt-3">
          <div className="flex items-center mb-2">
            <Activity size={16} className="text-app-secondary mr-2" />
            <p className="text-sm font-medium">Activity Level: <span className="capitalize">{healthData.activityLevel}</span></p>
          </div>
          <div className="flex items-center">
            <Target size={16} className="text-app-primary mr-2" />
            <p className="text-sm font-medium">Goal: <span className="capitalize">{healthData.goal} weight</span></p>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="mt-3">
          <p className="font-medium text-sm mb-2">Daily Targets:</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2 rounded bg-gray-50">
              <p className="text-xs text-gray-500">Calories</p>
              <p className="font-bold text-app-primary">{healthData.dailyCalorieGoal} kcal</p>
            </div>
            <div className="p-2 rounded bg-gray-50">
              <p className="text-xs text-gray-500">Protein</p>
              <p className="font-bold text-app-secondary">{healthData.dailyProteinGoal}g</p>
            </div>
            <div className="p-2 rounded bg-gray-50">
              <p className="text-xs text-gray-500">Carbs</p>
              <p className="font-bold text-app-accent">{healthData.dailyCarbGoal}g</p>
            </div>
            <div className="p-2 rounded bg-gray-50">
              <p className="text-xs text-gray-500">Fat</p>
              <p className="font-bold text-orange-500">{healthData.dailyFatGoal}g</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
