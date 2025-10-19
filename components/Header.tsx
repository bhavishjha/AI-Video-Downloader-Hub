
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            AI Video Downloader Hub
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
            Download videos and generate titles with the power of AI
        </p>
    </header>
  );
};
