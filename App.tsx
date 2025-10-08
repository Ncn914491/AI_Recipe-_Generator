
import React, { useState, useCallback } from 'react';
import { IngredientInput } from './components/IngredientInput';
import { RecipeDisplay } from './components/RecipeDisplay';
import { Spinner } from './components/Spinner';
import { ChefHatIcon } from './components/icons/ChefHatIcon';
import { generateRecipe } from './services/geminiService';
import type { Recipe } from './types';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['Tomatoes', 'Chicken Breast', 'Garlic']);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = useCallback((ingredient: string) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients(prev => [...prev, ingredient]);
    }
  }, [ingredients]);

  const handleRemoveIngredient = useCallback((index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const generatedRecipe = await generateRecipe(ingredients);
      setRecipe(generatedRecipe);
    } catch (err) {
      console.error(err);
      setError('Sorry, I couldn\'t come up with a recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const WelcomeMessage: React.FC = () => (
    <div className="text-center p-8 bg-white rounded-xl shadow-md border border-slate-200">
      <ChefHatIcon className="mx-auto h-16 w-16 text-emerald-500 mb-4" />
      <h2 className="text-2xl font-bold text-slate-800">What's in your kitchen?</h2>
      <p className="text-slate-600 mt-2">
        Add the ingredients you have, and let AI craft a delicious recipe for you.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            AI Recipe Generator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Turn your ingredients into inspiration with Gemini.
          </p>
        </header>

        <main>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200">
            <IngredientInput
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
            />
            
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            
            <div className="mt-6 text-center">
              <button
                onClick={handleGenerateRecipe}
                disabled={isLoading || ingredients.length === 0}
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 ease-in-out"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    <span>Creating Magic...</span>
                  </>
                ) : (
                  'Generate Recipe'
                )}
              </button>
            </div>
          </div>

          <div className="mt-10">
            {!isLoading && !recipe && <WelcomeMessage />}
            {recipe && <RecipeDisplay recipe={recipe} />}
          </div>
        </main>

        <footer className="text-center mt-12 py-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Powered by Google's Gemini API.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
