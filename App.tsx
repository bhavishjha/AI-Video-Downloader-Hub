
import React, { useState, useCallback } from 'react';
import { Platform, VideoInfo, AIGeneratedContent } from './types';
import { generateVideoMetadata } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DownloaderForm } from './components/DownloaderForm';
import { VideoPreview } from './components/VideoPreview';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>(Platform.YouTube);
  const [url, setUrl] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [aiContent, setAiContent] = useState<AIGeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const INSTAGRAM_REGEX = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/;

  const handleFetchVideo = useCallback(() => {
    setIsLoading(true);
    setError('');
    setVideoInfo(null);
    setAiContent(null);

    if (platform === Platform.YouTube && INSTAGRAM_REGEX.test(url)) {
      setError('This looks like an Instagram URL. Please switch to the Instagram tab to process it.');
      setIsLoading(false);
      return;
    }

    if (platform === Platform.Instagram && YOUTUBE_REGEX.test(url)) {
      setError('This looks like a YouTube URL. Please switch to the YouTube tab to process it.');
      setIsLoading(false);
      return;
    }

    const regex = platform === Platform.YouTube ? YOUTUBE_REGEX : INSTAGRAM_REGEX;
    const match = url.match(regex);

    if (!match || !match[1]) {
      setError(`Invalid ${platform} URL. Please enter a valid video link.`);
      setIsLoading(false);
      return;
    }

    const videoId = match[1];
    
    // Simulate API call to fetch video info
    setTimeout(() => {
      const newVideoInfo: VideoInfo = {
        id: videoId,
        platform,
        url,
        thumbnailUrl: platform === Platform.YouTube 
          ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
          : `https://picsum.photos/seed/${videoId}/480/360`,
        title: platform === Platform.YouTube ? `YouTube Video - ${videoId}` : `Instagram Post - ${videoId}`,
      };
      setVideoInfo(newVideoInfo);
      setIsLoading(false);
    }, 1500);
  }, [url, platform]);

  const handleGenerateAIContent = useCallback(async () => {
    if (!videoInfo) return;

    setIsAILoading(true);
    setError('');
    setAiContent(null);
    try {
      const content = await generateVideoMetadata(videoInfo.url);
      setAiContent(content);
    } catch (err) {
      setError('Failed to generate AI content. Please try again.');
      console.error(err);
    } finally {
      setIsAILoading(false);
    }
  }, [videoInfo]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <DownloaderForm
            platform={platform}
            setPlatform={setPlatform}
            url={url}
            setUrl={setUrl}
            onSubmit={handleFetchVideo}
            isLoading={isLoading}
          />

          {isLoading && <div className="flex justify-center p-10"><Loader /></div>}
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

          {videoInfo && !isLoading && (
            <VideoPreview
              videoInfo={videoInfo}
              aiContent={aiContent}
              isAILoading={isAILoading}
              onGenerateAI={handleGenerateAIContent}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
