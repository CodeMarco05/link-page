import Image from "next/image";
import Link from "next/link";

interface LinkTileProps {
    title: string;
    subtitle: string;
    imageUrl: string;
    href: string;
    alt?: string;
}

export default function LinkTile({
    title,
    subtitle,
    imageUrl,
    href,
    alt = "Link thumbnail"
}: LinkTileProps) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    return (
        <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-3 transition-all duration-300 ease-out overflow-hidden border border-gray-200 dark:border-gray-700"
        >
            {/* Image Container */}
            <div className="w-full h-30 bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-32 max-h-32">
                    <Image
                        src={imageUrl}
                        alt={alt}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-semibold font-sans text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 font-sans">
                    {subtitle}
                </p>
            </div>
        </Link>
    );
}
