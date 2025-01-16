import { Article } from '@/app/types/academy';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleGridProps {
    articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <Link 
                    key={article.id}
                    href={`/academy/articles/${article.id}`}
                    className="block bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                >
                    <div className="relative aspect-[16/9]">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{article.description}</p>
                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                            <span>{article.date}</span>
                            <span>{article.readTime}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
