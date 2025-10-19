import React, { useState } from 'react';
import { VideoInfo, AIGeneratedContent, Platform } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { Loader } from './Loader';
import { YouTubeDownloader } from './YouTubeDownloader';

interface VideoPreviewProps {
  videoInfo: VideoInfo;
  aiContent: AIGeneratedContent | null;
  isAILoading: boolean;
  onGenerateAI: () => void;
}

const AIContentDisplay: React.FC<{ content: AIGeneratedContent }> = ({ content }) => (
  <div className="mt-4 bg-slate-800/50 p-4 rounded-lg animate-fade-in">
    <h4 className="text-lg font-semibold text-cyan-300 mb-2">AI Generated Content</h4>
    <p className="text-slate-200 mb-3">
      <span className="font-medium text-slate-400">Title: </span>{content.title}
    </p>
    <div>
      <h5 className="font-medium text-slate-400 mb-2">Hashtags:</h5>
      <div className="flex flex-wrap gap-2">
        {content.hashtags.map((tag, index) => (
          <span key={index} className="bg-slate-700 text-cyan-300 text-sm font-mono px-2.5 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);


export const VideoPreview: React.FC<VideoPreviewProps> = ({ videoInfo, aiContent, isAILoading, onGenerateAI }) => {
  const downloadOptions = ['1080p', '720p', '360p', 'Audio'];
  const [selectedQuality, setSelectedQuality] = useState<string>(downloadOptions[0]);
  
  const handleInstagramDownloadClick = () => {
    // Create a text file with video info to simulate a download
    const fileContent = `This is a simulated download for the Instagram video:\n\nTitle: ${videoInfo.title}\nURL: ${videoInfo.url}\nSelected Quality: ${selectedQuality}\n\nActual video downloading is not performed in this demo.`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;

    // Sanitize the title to create a valid filename
    const fileName = `${videoInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${selectedQuality.toLowerCase()}.txt`;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-slate-700 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="sm:w-1/3">
          <img
            src={videoInfo.thumbnailUrl}
            alt="Video Thumbnail"
            className="rounded-lg w-full aspect-video object-cover shadow-md"
          />
        </div>
        <div className="sm:w-2/3">
           <p className="text-sm text-slate-400">{videoInfo.platform} Video</p>
           <h3 className="text-lg font-semibold text-slate-200 break-all">{videoInfo.title}</h3>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-700 pt-5">
        {videoInfo.platform === Platform.YouTube ? (
          <YouTubeDownloader videoInfo={videoInfo} />
        ) : (
          <div className="flex flex-wrap gap-3 items-center">
            <label htmlFor="quality-select" className="text-sm font-medium text-slate-400">Quality:</label>
            <select
              id="quality-select"
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none p-2"
            >
              {downloadOptions.map(option => (
                <option key={option} value={option} className="bg-slate-800 text-white">{option}</option>
              ))}
            </select>
            <button
              onClick={handleInstagramDownloadClick}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-5 border-t border-slate-700 pt-5">
        {!aiContent && (
          <button
            onClick={onGenerateAI}
            disabled={isAILoading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAILoading ? (
                <>
                <Loader/> <span className="ml-2">Generating...</span>
                </>
            ) : (
                '✨ Generate AI Title & Hashtags'
            )}
          </button>
        )}
        {isAILoading && !aiContent && (
            <div className="flex justify-center items-center h-24 text-slate-400">
                <Loader />
                <span className="ml-3">Gemini is thinking...</span>
            </div>
        )}
        {aiContent && <AIContentDisplay content={aiContent} />}
      </div>
    </div>
  );
};

const animationStyles = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);