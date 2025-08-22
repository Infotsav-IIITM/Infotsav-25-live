import { useState } from 'react';

export default function Footer() {
    const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
    
    const infotsavURL =
      "https://unstop.com/college-fests/infotsav25-atal-bihari-vajpayee-indian-institute-of-information-technology-and-management-384862";
    const handleOverallRegister = () => {
        window.open(infotsavURL, '_blank');
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedNumber(text);
            setTimeout(() => setCopiedNumber(null), 2000); // Clear after 2 seconds
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    return (
      <footer className="w-full relative bg-black/25 overflow-hidden py-8 max-sm:py-10 border-blue-700/10 poppins-thin">
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/Backgrounds/footer.png"
          alt="Footer Background"
        />

        {/* Main Content Container */}
        <div className="relative z-10 w-full mx-auto px-[10%] flex flex-col items-stretch justify-center max-md:items-center text-center ">
          {/* Get In Touch Title */}
          <h2 className="text-white text-6xl md:text-7xl mt-10 mb-8 font-cattedrale">
            Get In Touch
          </h2>

          {/* Social Media Icons */}
          <div className="flex justify-center items-center mt-8 gap-10 mb-16">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/infotsav-iiit-gwalior/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 hover:scale-110 transition-transform duration-200"
            >
              <img
                src="/assets/Images/Home/Footer/linkedin.svg"
                alt="LinkedIn"
              />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/infotsav_iiitm/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 hover:scale-110 transition-transform duration-200"
            >
              <img src="/assets/Images/Home/Footer/insta.svg" alt="Instagram" />
            </a>
            {/* Email */}
            <a
              href="mailto:infotsav@iiitm.ac.in"
              className="w-6 h-6 hover:scale-110 transition-transform duration-200"
            >
              <img src="/assets/Images/Home/Footer/email.svg" alt="Email" />
            </a>
          </div>

          {/* Three Column Layout */}
          <div className="flex flex-col lg:flex-row justify-between items-start max-md:items-center lg:items-center gap-12 lg:gap-8 mb-16">
            {/* Left: Join Us Now */}
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-white text-3xl md:text-4xl capitalize mb-6 font-bold">
                Join Us Now!
              </h3>
              <button
                className="px-6 py-3 rounded-full border border-white poppins-regular cursor-pointer text-white text-base capitalize hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-3 font-bold"
                onClick={handleOverallRegister}
              >
                Register Now
                <div className="w-3 h-3">
                  <div className="w-2 h-2 border border-white bg-black rounded-full" />
                </div>
              </button>
            </div>

            {/* Center: Logo */}
            <div className="flex md:ml-40">
              <img
                className="w-15 h-15 scale-105"
                src="/assets/Images/Home/Footer/logo.png"
                alt="Infotsav Logo"
              />
            </div>

            {/* Right: Contact Us */}
            <div className="flex flex-col items-center justify-center ">
              <h3 className="text-white text-3xl md:text-4xl capitalize mb-6 font-bold">
                Contact Us
              </h3>
              <div className="space-y-2 text-white text-base w-full font-bold text-xl">
                <div className="flex gap-4 w-full">
                  <span>Samyak Choudhary :</span>
                  <span
                    onClick={() => copyToClipboard("+91 9993148060")}
                    className="cursor-pointer hover:text-blue-400 transition-colors duration-200 relative"
                    title="Click to copy"
                  >
                    +91 9993148060
                    {copiedNumber === "+91 9993148060" && (
                      <span className="absolute -top-8 left-0 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex gap-4 w-full justify-between">
                  <span>Shashank Gour :</span>
                  <span
                    onClick={() => copyToClipboard("+91 9303332369")}
                    className="cursor-pointer hover:text-blue-400 transition-colors duration-200 relative"
                    title="Click to copy"
                  >
                    +91 9303332369
                    {copiedNumber === "+91 9303332369" && (
                      <span className="absolute -top-8 left-0 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-white text-xs">Copyright © Infotsav 2025</p>
          </div>
        </div>
      </footer>
    );
}
