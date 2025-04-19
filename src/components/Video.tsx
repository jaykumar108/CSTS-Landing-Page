import React, { useState, useEffect } from 'react';

const Video = () => {
  const videos = [
    '/video.mp4',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000); // 10 seconds per video

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[550px] overflow-hidden bg-black">
      {videos.map((video, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full border border-white transition-colors duration-200 ${
              index === currentIndex
                ? 'bg-white'
                : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Video;
