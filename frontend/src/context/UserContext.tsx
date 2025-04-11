
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, DailyLog, MealEntry } from '@/types';
import { getUserProfile, getDailyLog, addMealEntry } from '@/services/mockData';
import { toast } from 'sonner';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  dailyLog: DailyLog | null;
  addMeal: (meal: Omit<MealEntry, 'id'>) => Promise<void>;
  refreshDailyLog: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        
        const today = new Date().toISOString().split('T')[0];
        const logData = await getDailyLog(today);
        setDailyLog(logData);
      } catch (error) {
        console.error('Error loading user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const addMeal = async (meal: Omit<MealEntry, 'id'>) => {
    try {
      const newMeal = await addMealEntry(meal);
      
      // Update the daily log with the new meal
      if (dailyLog) {
        const updatedLog = {
          ...dailyLog,
          meals: [...dailyLog.meals, newMeal],
          totalCalories: dailyLog.totalCalories + newMeal.totalCalories,
          totalProtein: dailyLog.totalProtein + newMeal.totalProtein,
          totalCarbs: dailyLog.totalCarbs + newMeal.totalCarbs,
          totalFat: dailyLog.totalFat + newMeal.totalFat
        };
        setDailyLog(updatedLog);
      }
      
      toast.success('Meal added successfully!');
    } catch (error) {
      console.error('Error adding meal:', error);
      toast.error('Failed to add meal');
    }
  };

  const refreshDailyLog = async () => {
    try {
      setIsLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const logData = await getDailyLog(today);
      setDailyLog(logData);
    } catch (error) {
      console.error('Error refreshing daily log:', error);
      toast.error('Failed to refresh food log');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, dailyLog, addMeal, refreshDailyLog }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
