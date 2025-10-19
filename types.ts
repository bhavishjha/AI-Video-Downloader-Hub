
export enum Platform {
  YouTube = 'YouTube',
  Instagram = 'Instagram',
}

export interface VideoInfo {
  id: string;
  platform: Platform;
  url: string;
  thumbnailUrl: string;
  title: string;
}

export interface AIGeneratedContent {
  title: string;
  hashtags: string[];
}
