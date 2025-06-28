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
            className="relative inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-200 border-b border-emerald-400/30 hover:border-emerald-300/50"
            title={description || `En savoir plus sur ${children}`}
        >
            {children}
            <span className="ml-1 text-xs opacity-70">↗</span>
        </a>
    );
}