import React from 'react';
import { VideoInfo } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface YouTubeDownloaderProps {
  videoInfo: VideoInfo;
}

export const YouTubeDownloader: React.FC<YouTubeDownloaderProps> = ({ videoInfo }) => {
  
  const handleDownloadClick = () => {
    // Create a text file with video info to simulate a download
    const fileContent = `This is a simulated download for the YouTube video:\n\nTitle: ${videoInfo.title}\nURL: ${videoInfo.url}\n\nActual video downloading is not performed in this demo.`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    
    // Sanitize the title to create a valid filename
    const fileName = `${videoInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    a.download = fileName;
    
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h4 className="text-lg font-semibold text-slate-300 mb-3">Download Video</h4>
      <button
        onClick={handleDownloadClick}
        className="w-full flex items-center justify-center gap-2 bg-brand-youtube hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        <DownloadIcon className="w-5 h-5" />
        <span>Download YouTube Video</span>
      </button>
    </div>
  );
};
