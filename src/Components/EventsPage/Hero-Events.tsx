const Hero = () => {
  return (
    <div className="relative w-full bg-gradient-to-b from-sky-950 to-teal-700 flex items-center justify-center h-[30vh] md:h-screen overflow-hidden">
      {/* Main text */}
      <h1 className="text-[26vw] tracking-wide font-cattedrale z-[1]">
        Events
      </h1>
      {/* Responsive images with floating animations */}
      <img
        src="/assets/Images/test-events-page.png"
        className="absolute top-[3%] left-[10%] h-[24vw] animate-float"
        style={{ animationDelay: '0s', animationDuration: '3s' }}
      />
      <img
        src="/assets/Images/test-events-page.png"
        className="absolute bottom-[5%] left-[5%] h-[20vw] animate-float"
        style={{ animationDelay: '0.5s', animationDuration: '4s' }}
      />
      <img
        src="/assets/Images/test-events-page.png"
        className="absolute top-[6%] right-[40%] h-[20vw] md:z-[1] animate-float"
        style={{ animationDelay: '1s', animationDuration: '3.5s' }}
      />
      <img
        src="/assets/Images/test-events-page.png"
        className="absolute top-[3%] right-[12%] h-[22vw] animate-float"
        style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}
      />
      <img
        src="/assets/Images/test-events-page.png"
        className="absolute top-[53%] right-[3%] h-[18vw] md:z-[1] animate-float"
        style={{ animationDelay: '2s', animationDuration: '3s' }}
      />
      <img
        src="/assets/Images/test-events-page.png"
        className="absolute bottom-[2%] left-[30%] h-[16vw] md:z-[1] animate-float"
        style={{ animationDelay: '2.5s', animationDuration: '4s' }}
      />
      <img
        src="/assets/Images/test-events-page.png"
        className="absolute bottom-[3%] right-[28%] h-[20vw] animate-float"
        style={{ animationDelay: '3s', animationDuration: '3.5s' }}
      />
    </div>
  )
}

export default Hero
