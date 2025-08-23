import React, { useRef, useState, useEffect, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

interface Area {
    name: string;
    href: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    coords: [number, number][]; // array of [x,y] points
    style?: CSSProperties; // optional base styling
}

interface Props {
    src: string;
    alt: string;
    areas: Area[];
    className?: string; // e.g. "w-full h-auto"
    onAreaClick?: (area: Area) => void; // Add callback for area clicks
}

const SvgImageMap: React.FC<Props> = ({ src, alt, areas, className = '', onAreaClick }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [viewBox, setViewBox] = useState<string>('0 0 1 1');
    const navigate = useNavigate(); // 🧭 React Router DOM hook

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;
        const onLoad = () => {
            if (img.naturalWidth && img.naturalHeight) {
                setViewBox(`0 0 ${img.naturalWidth} ${img.naturalHeight}`);
            }
        };
        img.addEventListener('load', onLoad);
        if (img.complete) onLoad();
        return () => {
            img.removeEventListener('load', onLoad);
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="block w-full h-auto opacity-0"
            />
            <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid meet">
                {areas.map((area) => (
                    <polygon
                        key={area.name}
                        points={area.coords
                            .map(([x, y]) => `${x},${y}`)
                            .join(' ')}
                        className="transition-all duration-200 ease-in-out pointer-events-auto cursor-pointer"
                        style={{
                            fill: 'transparent',
                            stroke: 'transparent',
                            pointerEvents: 'all',
                            transition: 'fill 0.2s ease, stroke 0.2s ease',
                            ...area.style,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.fill =
                                'rgba(255, 255, 255, 0.07)';
                            e.currentTarget.style.stroke = 'white';
                            e.currentTarget.style.strokeWidth = '0';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.fill = 'transparent';
                            e.currentTarget.style.stroke = 'transparent';
                            e.currentTarget.style.strokeWidth = '0';
                        }}
                        onClick={() => {
                            // Check if href starts with '#' for internal scrolling
                            if (area.href.startsWith('#')) {
                                const targetElement = document.querySelector(
                                    area.href
                                );
                                if (targetElement) {
                                    targetElement.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    });
                                }
                            } else if (onAreaClick) {
                                // Use callback if provided (for PageTransition)
                                onAreaClick(area);
                            } else {
                                // Navigate using React Router for external routes
                                navigate(area.href);
                            }
                        }} // 👈 Handle both scrolling and navigation
                    />
                ))}
            </svg>
        </div>
    );
};

export default SvgImageMap;
