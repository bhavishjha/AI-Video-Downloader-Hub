import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-4 text-center text-slate-500 text-sm">
      <p>
        Built with React, Tailwind CSS, and Gemini API.
      </p>
      <p>Note: This is a UI demonstration. Downloads are simulated by generating a .txt file.</p>
    </footer>
  );
};
