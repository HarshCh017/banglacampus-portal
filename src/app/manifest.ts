import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BengalCampus – West Bengal Engineering College Discovery',
    short_name: 'BengalCampus',
    description:
      'Verified directory, WBJEE closing ranks, fee structures, and choice-filling simulator for engineering colleges in West Bengal.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070F22',
    theme_color: '#102A56',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
