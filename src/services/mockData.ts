
import { User, HealthData, FoodItem, MealEntry, DailyLog } from "@/types";

// Mock user data
export const mockUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  healthData: {
    age: 30,
    gender: "male",
    weight: 75, // kg
    height: 175, // cm
    activityLevel: "moderate",
    goal: "lose",
    dailyCalorieGoal: 2000,
    dailyProteinGoal: 150,
    dailyCarbGoal: 200,
    dailyFatGoal: 65
  }
};

// Mock food database
export const foodDatabase: FoodItem[] = [
  {
    id: "food1",
    name: "Apple",
    portion: "1 medium (182g)",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3
  },
  {
    id: "food2",
    name: "Chicken Breast",
    portion: "100g cooked",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6
  },
  {
    id: "food3",
    name: "Brown Rice",
    portion: "1 cup cooked (195g)",
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 1.8
  },
  {
    id: "food4",
    name: "Spinach",
    portion: "1 cup raw (30g)",
    calories: 7,
    protein: 0.9,
    carbs: 1.1,
    fat: 0.1
  },
  {
    id: "food5",
    name: "Salmon",
    portion: "100g cooked",
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13
  },
  {
    id: "food6",
    name: "Avocado",
    portion: "1/2 medium (68g)",
    calories: 114,
    protein: 1.3,
    carbs: 6,
    fat: 10.5
  },
  {
    id: "food7",
    name: "Greek Yogurt",
    portion: "170g",
    calories: 100,
    protein: 17,
    carbs: 6,
    fat: 0.7
  },
  {
    id: "food8",
    name: "Banana",
    portion: "1 medium (118g)",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4
  },
  {
    id: "food9",
    name: "Oatmeal",
    portion: "1 cup cooked (234g)",
    calories: 166,
    protein: 5.9,
    carbs: 28,
    fat: 3.6
  },
  {
    id: "food10",
    name: "Salad",
    portion: "1 bowl (200g)",
    calories: 70,
    protein: 2.5,
    carbs: 12,
    fat: 1.2
  },
  {
    id: "food11",
    name: "Pasta",
    portion: "1 cup cooked (140g)",
    calories: 200,
    protein: 7,
    carbs: 40,
    fat: 1
  },
  {
    id: "food12",
    name: "Steak",
    portion: "100g cooked",
    calories: 250,
    protein: 26,
    carbs: 0,
    fat: 17
  }
];

// Mock meal entries
export const mockMealEntries: MealEntry[] = [
  {
    id: "meal1",
    userId: "user1",
    date: new Date().toISOString().split('T')[0],
    mealType: "breakfast",
    items: [
      { ...foodDatabase[8], id: "entry1" }, // Oatmeal
      { ...foodDatabase[7], id: "entry2" }, // Banana
      { ...foodDatabase[6], id: "entry3" }  // Greek Yogurt
    ],
    totalCalories: 371,
    totalProtein: 24.5,
    totalCarbs: 61,
    totalFat: 4.7,
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b2F0bWVhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
  },
  {
    id: "meal2",
    userId: "user1",
    date: new Date().toISOString().split('T')[0],
    mealType: "lunch",
    items: [
      { ...foodDatabase[1], id: "entry4" }, // Chicken Breast
      { ...foodDatabase[2], id: "entry5" }, // Brown Rice
      { ...foodDatabase[3], id: "entry6" }  // Spinach
    ],
    totalCalories: 388,
    totalProtein: 36.9,
    totalCarbs: 46.1,
    totalFat: 5.5,
    image: "https://images.unsplash.com/photo-1580013759032-c96505e24c1f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHJpY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
  }
];

// Create a daily log from the meal entries
export const mockDailyLog: DailyLog = {
  date: new Date().toISOString().split('T')[0],
  meals: mockMealEntries,
  totalCalories: mockMealEntries.reduce((sum, meal) => sum + meal.totalCalories, 0),
  totalProtein: mockMealEntries.reduce((sum, meal) => sum + meal.totalProtein, 0),
  totalCarbs: mockMealEntries.reduce((sum, meal) => sum + meal.totalCarbs, 0),
  totalFat: mockMealEntries.reduce((sum, meal) => sum + meal.totalFat, 0)
};

// Simulate food detection based on image
export function detectFoodsFromImage(imageUrl: string): Promise<FoodItem[]> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Return random food items from our database as "detected" items
      const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items
      const detectedItems: FoodItem[] = [];
      
      for (let i = 0; i < numItems; i++) {
        const randomIndex = Math.floor(Math.random() * foodDatabase.length);
        const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
        
        detectedItems.push({
          ...foodDatabase[randomIndex],
          id: `detected-${Date.now()}-${i}`,
          confidence
        });
      }
      
      resolve(detectedItems);
    }, 2000); // 2 second delay to simulate processing
  });
}

// Save meal to the daily log
export function addMealEntry(newMeal: Omit<MealEntry, 'id'>): Promise<MealEntry> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mealWithId: MealEntry = {
        ...newMeal,
        id: `meal-${Date.now()}`
      };
      
      // In a real app, this would update the database
      mockMealEntries.push(mealWithId);
      
      // Update daily totals
      mockDailyLog.totalCalories += mealWithId.totalCalories;
      mockDailyLog.totalProtein += mealWithId.totalProtein;
      mockDailyLog.totalCarbs += mealWithId.totalCarbs;
      mockDailyLog.totalFat += mealWithId.totalFat;
      
      resolve(mealWithId);
    }, 500);
  });
}

// Get the current daily log
export function getDailyLog(date: string): Promise<DailyLog> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDailyLog);
    }, 500);
  });
}

// Get user profile
export function getUserProfile(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 500);
  });
}
