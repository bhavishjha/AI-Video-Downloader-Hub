
import React from 'react';
import { Platform } from '../types';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { InstagramIcon } from './icons/InstagramIcon';

interface DownloaderFormProps {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  url: string;
  setUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const DownloaderForm: React.FC<DownloaderFormProps> = ({ platform, setPlatform, url, setUrl, onSubmit, isLoading }) => {
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  const platformOptions = [
    { name: Platform.YouTube, icon: YouTubeIcon, color: 'brand-youtube' },
    { name: Platform.Instagram, icon: InstagramIcon, color: 'brand-instagram' },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700">
      <div className="flex justify-center mb-5">
        <div className="bg-slate-900 p-1 rounded-full flex space-x-1">
          {platformOptions.map((opt) => (
            <button
              key={opt.name}
              onClick={() => setPlatform(opt.name)}
              className={`w-32 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center transition-colors duration-300 ${
                platform === opt.name
                  ? `bg-${opt.color} text-white shadow-md`
                  : 'text-slate-400 hover:bg-slate-700'
              }`}
            >
              <opt.icon className="h-5 w-5 mr-2" />
              {opt.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={`Enter ${platform} video URL...`}
          disabled={isLoading}
          className="flex-grow bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
        >
          {isLoading ? 'Fetching...' : 'Fetch Video'}
        </button>
      </form>
    </div>
  );
};
