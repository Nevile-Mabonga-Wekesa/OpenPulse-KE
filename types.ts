export enum Sentiment {
  Positive = 'Positive',
  Negative = 'Negative',
  Neutral = 'Neutral',
  Volatile = 'Volatile'
}

export enum Platform {
  Twitter = 'Twitter',
  Facebook = 'Facebook',
  TikTok = 'TikTok',
  WhatsApp = 'WhatsApp'
}

export enum Region {
  Nairobi = 'Nairobi',
  Mombasa = 'Mombasa',
  Kisumu = 'Kisumu',
  Nakuru = 'Nakuru',
  Eldoret = 'Eldoret',
  Central = 'Central',
  RiftValley = 'Rift Valley',
  Coast = 'Coast',
  NorthEastern = 'North Eastern'
}

export interface SocialPost {
  id: string;
  author: string;
  content: string;
  platform: Platform;
  timestamp: Date;
  likes: number;
  shares: number;
  sentiment: Sentiment;
  region: Region;
  isMisinfo: boolean;
  riskScore: number; // 0-100
}

export interface TrendMetric {
  time: string;
  volume: number;
  sentimentScore: number; // -100 to 100
}

export interface VerificationResult {
  claim: string;
  verdict: 'True' | 'False' | 'Unverified' | 'Misleading';
  confidence: number;
  sources: Array<{ title: string; uri: string }>;
  explanation: string;
}

export interface AnalysisResult {
  sentiment: Sentiment;
  riskScore: number;
  summary: string;
  topics: string[];
}
