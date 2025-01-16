import { Video } from '@/app/types/academy';
import Image from 'next/image';
import Link from 'next/link';

interface VideoGridProps {
    videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
                <Link 
                    key={video.id} 
                    href={video.videoUrl}
                    target="_blank"
                    className="block bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                >
                    <div className="relative aspect-video">
                        <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-sm">
                            {video.duration}
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                        <div className="mt-2 text-sm text-gray-500">{video.date}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
