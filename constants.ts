import { Platform, Region, Sentiment, SocialPost } from './types';

export const MOCK_POSTS: SocialPost[] = [
  {
    id: '1',
    author: '@citizen_voice',
    content: 'Voting machines in Kisumu are reportedly failing. We need IEBC to respond immediately! #Election2027',
    platform: Platform.Twitter,
    timestamp: new Date(),
    likes: 1240,
    shares: 450,
    sentiment: Sentiment.Negative,
    region: Region.Kisumu,
    isMisinfo: false,
    riskScore: 75
  },
  {
    id: '2',
    author: 'PeaceKeeper254',
    content: 'Great turnout in Nairobi today. Let us keep the peace and wait for official results. Amani Kenya.',
    platform: Platform.Facebook,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    likes: 3400,
    shares: 890,
    sentiment: Sentiment.Positive,
    region: Region.Nairobi,
    isMisinfo: false,
    riskScore: 10
  },
  {
    id: '3',
    author: '@anon_leaks',
    content: 'BREAKING: Ballot stuffing confirmed in sector 4. Video evidence coming soon. They are stealing it!',
    platform: Platform.Twitter,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 8900,
    shares: 5000,
    sentiment: Sentiment.Volatile,
    region: Region.Central,
    isMisinfo: true,
    riskScore: 95
  },
  {
    id: '4',
    author: 'Youth4Change',
    content: 'The queues are long but moving fast. Remember to carry your ID. Do not be discouraged!',
    platform: Platform.TikTok,
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    likes: 560,
    shares: 120,
    sentiment: Sentiment.Positive,
    region: Region.Nakuru,
    isMisinfo: false,
    riskScore: 20
  },
  {
    id: '5',
    author: 'CoastObserver',
    content: 'Tension rising near the ferry crossing. Police presence increased heavily in the last hour.',
    platform: Platform.Twitter,
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    likes: 780,
    shares: 300,
    sentiment: Sentiment.Negative,
    region: Region.Mombasa,
    isMisinfo: false,
    riskScore: 60
  }
];

export const REGIONS_COORDINATES: Record<Region, { x: number; y: number }> = {
  [Region.Nairobi]: { x: 50, y: 60 },
  [Region.Mombasa]: { x: 80, y: 80 },
  [Region.Kisumu]: { x: 20, y: 55 },
  [Region.Nakuru]: { x: 40, y: 50 },
  [Region.Eldoret]: { x: 30, y: 45 },
  [Region.Central]: { x: 55, y: 50 },
  [Region.RiftValley]: { x: 35, y: 30 },
  [Region.Coast]: { x: 75, y: 70 },
  [Region.NorthEastern]: { x: 70, y: 30 },
};
