export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    date: string;
    readTime: string;
}

export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: string;
    date: string;
}
