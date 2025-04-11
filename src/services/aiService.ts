
import { FoodItem } from '@/types';
import { detectFoodsFromImage } from './mockData';

// This would connect to a real AI service in production
export async function analyzeFoodImage(imageFile: File): Promise<{
  detectedItems: FoodItem[];
  aiSummary: string;
}> {
  try {
    // Convert the image file to a data URL
    const imageUrl = await fileToDataUrl(imageFile);
    
    // Call the mock detection function (would be a real AI API in production)
    const detectedItems = await detectFoodsFromImage(imageUrl);
    
    // Generate a summary of the detected food items
    let aiSummary = "";
    
    if (detectedItems.length > 0) {
      const itemNames = detectedItems.map(item => item.name).join(", ");
      const totalCalories = detectedItems.reduce((sum, item) => sum + item.calories, 0);
      
      aiSummary = `I detected ${detectedItems.length} item${detectedItems.length > 1 ? 's' : ''}: ${itemNames}. ` +
        `This meal contains approximately ${totalCalories} calories. ` +
        getHealthTip(detectedItems);
    } else {
      aiSummary = "I couldn't identify any food items in this image. Please try again with a clearer photo.";
    }
    
    return { detectedItems, aiSummary };
  } catch (error) {
    console.error('Error analyzing food image:', error);
    throw new Error('Failed to analyze food image');
  }
}

// Helper function to convert a file to a data URL
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Generate a health tip based on the detected food items
function getHealthTip(items: FoodItem[]): string {
  const totalProtein = items.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = items.reduce((sum, item) => sum + item.carbs, 0);
  const totalFat = items.reduce((sum, item) => sum + item.fat, 0);
  
  // Check macronutrient distribution
  if (totalProtein < 15 && items.length > 1) {
    return "Consider adding a protein source to create a more balanced meal.";
  } else if (totalCarbs > 60 && totalFat < 10) {
    return "This meal is high in carbs. Consider adding healthy fats like avocado or nuts for better satiety.";
  } else if (totalFat > 30 && totalProtein < 15) {
    return "This meal is high in fat. Consider balancing it with more protein sources.";
  }
  
  // Default positive reinforcement
  const healthyFoods = items.filter(item => 
    item.name.toLowerCase().includes("vegetable") || 
    item.name.toLowerCase().includes("fruit") ||
    ["spinach", "kale", "broccoli", "avocado", "salmon", "chicken breast"].includes(item.name.toLowerCase())
  );
  
  if (healthyFoods.length > 0) {
    return "Great choice! This meal contains nutritious whole foods.";
  }
  
  return "Remember to aim for a balanced meal with protein, complex carbs, and healthy fats.";
}
