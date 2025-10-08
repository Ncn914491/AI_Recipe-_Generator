
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The name of the recipe."
    },
    description: {
      type: Type.STRING,
      description: "A short, enticing description of the dish."
    },
    prepTime: {
        type: Type.STRING,
        description: "Estimated preparation time, e.g., '15 minutes'."
    },
    cookTime: {
        type: Type.STRING,
        description: "Estimated cooking time, e.g., '30 minutes'."
    },
    servings: {
        type: Type.STRING,
        description: "Number of servings the recipe makes, e.g., '4 servings'."
    },
    ingredients: {
      type: Type.ARRAY,
      description: "A list of ingredients with their quantities.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The name of the ingredient."
          },
          quantity: {
            type: Type.STRING,
            description: "The quantity of the ingredient, e.g., '2 cups' or '1 tbsp'."
          }
        },
        required: ["name", "quantity"]
      }
    },
    instructions: {
      type: Type.ARRAY,
      description: "A list of step-by-step instructions for preparing the dish.",
      items: {
        type: Type.STRING,
        description: "A single instruction step."
      }
    }
  },
  required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"]
};

export const generateRecipe = async (ingredients: string[]): Promise<Recipe> => {
  const prompt = `Generate a complete recipe using the following ingredients: ${ingredients.join(', ')}. 
You can also use common pantry staples like salt, pepper, basic spices, oil, and water. 
The recipe should be creative and delicious. Provide a name, a brief description, prep time, cook time, servings, a list of ingredients with quantities, and step-by-step instructions.
If the ingredients are insufficient for a coherent recipe, please respond with a helpful suggestion for one or two key ingredients that would complete a dish, formatted in the same JSON structure but with a recipeName like "Suggestion" and the suggestion in the description.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.7,
      }
    });
    
    const jsonText = response.text.trim();
    const recipeData: Recipe = JSON.parse(jsonText);
    
    return recipeData;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe from API.");
  }
};
