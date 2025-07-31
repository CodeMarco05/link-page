import Link from "next/link";

interface NoteTileProps {
    title: string;
    content: string;
    href?: string;
    backgroundColor?: string;
}

export default function NoteTile({
    title,
    content,
    href,
    backgroundColor = "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"
}: NoteTileProps) {
    const tileContent = (
        <div className={`group block ${backgroundColor} rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden border border-gray-200 dark:border-gray-700 h-full`}>
            {/* Content */}
            <div className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold font-sans text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-4">
                    {title}
                </h3>
                <div className="flex-1 overflow-y-auto">
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed whitespace-pre-line">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );

    // If href is provided, wrap in Link, otherwise just return the tile
    if (href) {
        const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

        return (
            <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="h-full"
            >
                {tileContent}
            </Link>
        );
    }

    return tileContent;
}
