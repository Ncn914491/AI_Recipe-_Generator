
import React from 'react';
import type { Recipe } from '../types';
import { ChefHatIcon } from './icons/ChefHatIcon';

interface RecipeDisplayProps {
  recipe: Recipe;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  const InfoPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="text-center">
      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">{label}</p>
      <p className="text-slate-800 font-medium">{value}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
      <div className="p-6 sm:p-8">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full p-2 mr-4">
            <ChefHatIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{recipe.recipeName}</h2>
            <p className="mt-1 text-slate-600">{recipe.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 my-6 py-4 border-y border-slate-200">
          <InfoPill label="Prep Time" value={recipe.prepTime} />
          <InfoPill label="Cook Time" value={recipe.cookTime} />
          <InfoPill label="Servings" value={recipe.servings} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-500 font-bold mr-2">&#8226;</span>
                  <span className="text-slate-700">
                    <span className="font-semibold">{ing.quantity}</span> {ing.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Instructions</h3>
            <ol className="space-y-3 list-inside list-decimal">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="text-slate-700 leading-relaxed marker:text-emerald-500 marker:font-bold">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed
// For simplicity, we can use a small style block in index.html if we don't have a config
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
