import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BanglaCampus — West Bengal Engineering College Discovery',
    short_name: 'BanglaCampus',
    description:
      'Verified directory, WBJEE closing ranks, fee structures, and choice-filling simulator for engineering colleges in West Bengal.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#047857',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
