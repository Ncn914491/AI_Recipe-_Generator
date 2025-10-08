
import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (index: number) => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onAddIngredient, onRemoveIngredient }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onAddIngredient(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div>
      <label htmlFor="ingredient-input" className="block text-sm font-medium text-slate-700 mb-2">
        Enter your ingredients one by one
      </label>
      <div className="relative">
        <input
          id="ingredient-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Chicken, Onion, Bell Peppers..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-200"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {ingredients.map((ingredient, index) => (
          <span
            key={index}
            className="flex items-center bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            {ingredient}
            <button
              onClick={() => onRemoveIngredient(index)}
              className="ml-2 text-emerald-600 hover:text-emerald-800 focus:outline-none"
              aria-label={`Remove ${ingredient}`}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
