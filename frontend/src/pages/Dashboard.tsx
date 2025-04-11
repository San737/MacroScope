
import React from 'react';
import { useUser } from '@/context/UserContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw } from 'lucide-react';
import UserProfile from '@/components/UserProfile';
import DailyNutritionSummary from '@/components/DailyNutritionSummary';
import MealCard from '@/components/MealCard';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, isLoading, dailyLog, refreshDailyLog } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-app-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your data...</p>
        </div>
      </div>
    );
  }

  if (!user || !dailyLog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to PlateToPixelPal</h2>
          <p className="text-gray-500 mb-6">Please sign in to access your food tracker</p>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold gradient-heading">PlateToPixelPal</h1>
        <p className="text-gray-500">Your AI-powered nutrition tracker</p>
      </header>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Dashboard</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => refreshDailyLog()}
            className="flex items-center"
          >
            <RefreshCw size={16} className="mr-1" />
            Refresh
          </Button>
          <Button asChild size="sm" className="flex items-center">
            <Link to="/log-meal">
              <PlusCircle size={16} className="mr-1" />
              Log Meal
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <DailyNutritionSummary dailyLog={dailyLog} />
        </div>
        <div>
          <UserProfile user={user} />
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Today's Meals</h3>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
            <TabsTrigger value="snack">Snack</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          {dailyLog.meals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dailyLog.meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No meals logged for today</p>
              <Button asChild>
                <Link to="/log-meal">Log Your First Meal</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
          <TabsContent key={mealType} value={mealType}>
            {dailyLog.meals.filter(meal => meal.mealType === mealType).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dailyLog.meals
                  .filter(meal => meal.mealType === mealType)
                  .map((meal) => (
                    <MealCard key={meal.id} meal={meal} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No {mealType} logged for today</p>
                <Button asChild>
                  <Link to={`/log-meal?type=${mealType}`}>Log {mealType}</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Dashboard;
