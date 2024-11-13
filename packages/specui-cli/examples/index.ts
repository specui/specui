import DrizzleExample from './drizzle-example.json';
import NextClerkAuthentication from './next-clerk-authentication.json';
import NextHelloWorld from './next-hello-world.json';
import NextSpinningLoader from './next-spinning-loader.json';
import NextVercelAnalytics from './next-vercel-analytics.json';
import RemotionExample from './remotion-example.json';
import TauriMba from './tauri-mba.json';

export const examples: Record<string, any> = {
  'drizzle-example': DrizzleExample,
  'next-clerk-authentication': NextClerkAuthentication,
  'next-hello-world': NextHelloWorld,
  'next-spinning-loader': NextSpinningLoader,
  'next-vercel-analytics': NextVercelAnalytics,
  'remotion-example': RemotionExample,
  'tauri-mba': TauriMba,
};

export const drizzle = ['drizzle-example'];

export const next = [
  'next-clerk-authentication',
  'next-hello-world',
  'next-spinning-loader',
  'next-vercel-analytics',
];

export const remotion = ['remotion-example'];

export const tauri = ['tauri-mba'];
