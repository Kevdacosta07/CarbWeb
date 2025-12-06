'use client';

interface TechnicalLinkProps {
    children: React.ReactNode;
    href: string;
    description?: string;
}

export function TechnicalLink({ children, href, description }: TechnicalLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 border-b border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 dark:hover:border-emerald-500"
            title={description || `En savoir plus sur ${children}`}
        >
            {children}
            <span className="ml-1 text-[10px] opacity-70">↗</span>
        </a>
    );
}
