import SvgImageMap from './SvgImageMap';
import { useMediaQuery } from 'react-responsive';
import useMobileMenuStore from '@/stores/MobileMenuStore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Area {
    name: string;
    href: string;
    coords: [number, number][];
    style: { transition: string };
}

const areas: Area[] = [
    {
        name: 'Area 1',
        href: '/events',
        coords: [
            [117, 176],
            [277, 178],
            [315, 153],
            [279, 127],
            [120, 132],
        ],
        style: {
            transition: 'fill 0.2s, stroke 0.2s',
        },
    },
    {
        name: 'Area 2',
        href: '/sponsors',
        coords: [
            [71, 217],
            [109, 190],
            [268, 204],
            [272, 249],
            [110, 245],
        ],
        style: {
            transition: 'fill 0.2s, stroke 0.2s',
        },
    },
    {
        name: 'Area 3',
        href: '/ambassador',
        coords: [
            [276, 263],
            [311, 285],
            [278, 313],
            [103, 318],
            [100, 270],
        ],
        style: {
            transition: 'fill 0.2s, stroke 0.2s',
        },
    },
    {
        name: 'Area 4',
        href: '#about-us',
        coords: [
            [84, 358],
            [114, 333],
            [272, 334],
            [272, 378],
            [112, 383],
        ],
        style: {
            transition: 'fill 0.2s, stroke 0.2s',
        },
    },
];

const registerArea: Area[] = [
    {
        name: 'Area 5',
        href: '/register',
        coords: [
            [31, 126],
            [62, 100],
            [192, 103],
            [220, 128],
            [194, 153],
            [66, 155],
        ],
        style: {
            transition: 'fill 0.2s, stroke 0.2s',
        },
    },
];

const Hero = () => {
    const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Clean up any transition classes when component unmounts
            document.body.classList.remove('page-transitioning');
            document.body.classList.remove('page-transitioning-left');
        };
    }, []);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const toggleMobileMenu = useMobileMenuStore(
        (state) => state.toggleMobileMenu
    );
    const handleMobileMenu = () => {
        if (isMobile) {
            toggleMobileMenu();
        }
    };

    const handleSponsorsClick = () => {
        // Add a class to the body for the transition effect
        document.body.classList.add('page-transitioning');
        
        // Navigate after a short delay to show the transition
        setTimeout(() => {
            navigate('/sponsors');
        }, 150);
    };

    const handleEventsClick = () => {
        // Add a class to the body for the left transition effect
        document.body.classList.add('page-transitioning-left');
        
        // Navigate after a short delay to show the transition
        setTimeout(() => {
            navigate('/events');
        }, 150);
    };

    const handleAmbassadorClick = () => {
        // Add a class to the body for the left transition effect
        document.body.classList.add('page-transitioning-left');
        
        // Navigate after a short delay to show the transition
        setTimeout(() => {
            navigate('/ambassador');
        }, 150);
    };

    // Parallax calculations - reduce effect on mobile for better performance
    const moonParallax = isMobile ? scrollY * 0.4 : scrollY * 0.5; // Reduced parallax on mobile
    const logoParallax = isMobile ? scrollY * 0.4 : scrollY * 0.5; // Reduced parallax on mobile
    return (
        <>
            <div className="w-full h-dvh max-h-[800px] relative bg-stone-950 overflow-hidden flex items-center justify-center">
                <div className="w-[1266px] h-[1266px] mx-auto top-[300px] absolute bg-gradient-to-b from-red-600/50 to-red-800/50 rounded-full blur-[250px]" />
                {/* <div className="w-[822px] h-[822px] mx-auto top-[350px] absolute bg-gradient-to-b from-red-600 to-red-800 rounded-full blur-[200px]" /> */}
                <img
                    src="/assets/Images/hero-blur1.svg"
                    alt=""
                    className="absolute w-full h-full object-cover"
                />
                {/* <img src="/assets/Images/hero-blur2.png" alt="" className="absolute w-full h-full object-cover" /> */}
                <div
                    className="w-[550px] h-[550px] flex justify-center items-center absolute -bottom-25 z-10 max-sm:-bottom-25"
                    style={{
                        transform: `translate3d(0, ${moonParallax}px, 0)`,
                        transition: isMobile
                            ? 'none'
                            : 'transform 0.1s ease-out',
                        willChange: 'transform',
                    }}>
                    <div className="w-full h-full absolute bg-red-600/30 rounded-full" />
                    <img
                        className="object-cover z-10 scale-108 w-full h-full -mt-32 ml-4"
                        src="/assets/Images/moon.svg"
                        alt="moon"
                    />
                </div>
                <img
                    src="/assets/Images/Infotsav25.svg"
                    className="z-20 bottom-30 scale-85 max-sm:bottom-[22%] absolute object-cover"
                    style={{
                        transform: `translate3d(0, ${logoParallax}px, 0)`,
                        transition: isMobile
                            ? 'none'
                            : 'transform 0.1s ease-out',
                        willChange: 'transform',
                    }}
                    alt=""
                />
                <img
                    className="absolute z-20 max-md:-bottom-10 h-full w-full overflow-hidden object-cover"
                    src={'/assets/Images/trees-bg.png'}
                />
                <div
                    className="top-0 absolute w-52 z-20"
                    onClick={() => handleMobileMenu()}>
                    <img
                        src="/assets/Images/hanging-board.svg"
                        className="z-20"
                        alt="ground"
                    />
                    <p className="text-white text-center top-[62px] left-[78px] text-2xl absolute font-realwood opacity-80">
                        {isMobile ? 'Menu' : 'Home'}
                    </p>
                </div>
                <img
                    src="/assets/Images/mind-flayer1.png"
                    className="opacity-10 z-0 w-full top-5 h-full absolute object-cover"
                    alt=""
                />

                <img
                    src="/assets/Images/sign-board.svg"
                    className="block w-48 bottom-10 scale-150 right-[15%] h-auto absolute z-10 max-md:hidden"
                    alt="Sign Board"
                />
                <img
                    src="/assets/Images/register-sign.svg"
                    className="block w-48 bottom-0 scale-115 left-[17%] h-auto absolute z-10 max-md:hidden"
                    alt="Sign Board"
                />
                <div className="absolute bottom-10 scale-150 right-[15%] z-30 w-48">
                    <SvgImageMap
                        src="/assets/Images/sign-board.svg"
                        alt="Interactive Map"
                        className="w-full h-auto max-sm:hidden"
                        areas={areas}
                        onAreaClick={(area) => {
                            if (area.href === '/sponsors') {
                                handleSponsorsClick();
                            } else if (area.href === '/events') {
                                handleEventsClick();
                            } else if (area.href === '/ambassador') {
                                handleAmbassadorClick();
                            }
                        }}
                    />
                </div>
                <div className="absolute bottom-0 scale-115 left-[17%] z-30 w-48">
                    <SvgImageMap
                        src="/assets/Images/register-sign.svg"
                        alt="Interactive Map"
                        className="w-full h-auto max-sm:hidden"
                        areas={registerArea}
                    />
                </div>
            </div>
        </>
    );
};

export default Hero;
