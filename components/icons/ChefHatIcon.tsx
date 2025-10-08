
import React from 'react';

export const ChefHatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 18H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h16v1a2 2 0 0 1-2 2h-2" />
    <path d="M6 11V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
    <path d="M10 4V2" />
    <path d="M14 4V2" />
  </svg>
);
