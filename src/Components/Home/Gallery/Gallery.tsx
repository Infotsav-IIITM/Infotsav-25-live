import Masonry from '@/Components/ui/Masonry';

const Gallery = () => {
    const items = [
        {
            id: '1',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416889/Closing_ceremony_Large_jeorbx.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416889/Closing_ceremony_Large_jeorbx.jpg',
            height: 400,
        },
        {
            id: '2',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416640/Code_rush_xjqlbp.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416640/Code_rush_xjqlbp.jpg',
            height: 250,
        },
        {
            id: '3',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416867/Hackatron_nyff3m.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416867/Hackatron_nyff3m.jpg',
            height: 600,
        },

        {
            id: '4',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416642/Pinnacle_kj93pf.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416642/Pinnacle_kj93pf.jpg',
            height: 600,
        },

        {
            id: '5',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416853/Pronite_1_Large_gmdiqd.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416853/Pronite_1_Large_gmdiqd.jpg',
            height: 600,
        },

        {
            id: '6',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416640/Pronite_2_h8teb8.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416640/Pronite_2_h8teb8.jpg',
            height: 600,
        },

        {
            id: '7',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416640/Pronite_3_c3aqmj.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416640/Pronite_3_c3aqmj.jpg',
            height: 600,
        },

        {
            id: '8',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754724882/aurora23_1_qa9ytg.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754724882/aurora23_1_qa9ytg.jpg',
            height: 600,
        },
        {
            id: '9',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416642/RoboMaze_jznorw.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416642/RoboMaze_jznorw.jpg',
            height: 600,
        },

        {
            id: '10',
            img: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416844/Robowars_Large_swnqbv.jpg',
            url: 'https://res.cloudinary.com/dih6gwkau/image/upload/v1754416844/Robowars_Large_swnqbv.jpg',
            height: 600,
        },
    ];
    return (
        <div
            className="w-full h-[900px] relative bg-gradient-to-t to-stone-950 overflow-hidden max-md:h-dvh"
            style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE 10+
            }}>
            {/* Fixed Gallery Title */}
            <div className="sticky top-3 z-20 bg-stone-950 pt-6 pb-4 flex items-center justify-center">
                <h2 className="text-red-600 text-6xl md:text-7xl lg:text-8xl font-cattedrale">
                    Gallery
                </h2>
            </div>
            <div className="h-4"></div>

            {/* Scrollable Content */}
            <div
                className="overflow-y-scroll px-6 pb-6 pt-4 "
                style={{
                    height: 'calc(100% - 140px)', // Subtract header height
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE 10+
                }}>
                <Masonry
                    items={items}
                    ease="power3.out"
                    duration={0.6}
                    stagger={0.05}
                    animateFrom="bottom"
                    scaleOnHover={true}
                    hoverScale={0.95}
                    blurToFocus={true}
                    colorShiftOnHover={false}
                />
            </div>
        </div>
    );
};

export default Gallery;
