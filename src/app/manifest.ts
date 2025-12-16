import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Swift Response',
        short_name: 'Swift',
        description: 'Unified Multi-Channel Emergency Alert System',
        start_url: '/emergency',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ef4444',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
