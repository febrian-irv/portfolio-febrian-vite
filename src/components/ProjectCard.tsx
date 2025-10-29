import { useState, useRef } from "react";

interface ProjectCardProps {
  title: string;
  logo: string;
  imageUrl: string;
  videoUrl?: string;
  statistics: string;
  quote: string;
  tags: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  logo,
  imageUrl,
  videoUrl,
  statistics,
  quote,
  tags,
  link,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && videoUrl) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && videoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const CardContent = (
    <div
      className={`relative flex-shrink-0 snap-start w-[82vw] max-w-[450px] sm:w-[85vw] sm:max-w-[500px] md:w-[550px] lg:w-[650px] xl:w-[700px] h-[520px] md:h-[650px] lg:h-[750px] xl:h-[800px] bg-gray-800 rounded-3xl overflow-hidden transition-all duration-300 ${
        link ? "hover:scale-[1.02] cursor-pointer" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image/Video - Fills entire card */}
      <img
        src={imageUrl}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
          isHovered && videoUrl ? "opacity-0" : "opacity-100"
        }`}
      />
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
        />
      )}

      {/* Gradient Overlay - Bottom half for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/95" />

      {/* Logo Section - Top Center with semi-transparent background */}
      <div className="absolute top-0 left-0 right-0 flex justify-center items-center pt-4 pb-3 md:pt-6 md:pb-4 lg:pt-8 lg:pb-6 bg-gradient-to-b from-black/80 to-transparent">
        <img
          src={logo}
          alt={`${title} logo`}
          className="h-8 md:h-10 lg:h-12 object-contain relative z-10"
        />
      </div>

      {/* Content Section - Bottom with overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 z-10">
        {/* Statistics */}
        <div className="mb-3 md:mb-4">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-pixeled text-white mb-2 whitespace-pre-line leading-tight">
            {statistics}
          </h3>
        </div>

        {/* Quote */}
        <div className="mb-4 md:mb-5 lg:mb-6">
          <p className="text-sm md:text-base font-be-vietnam text-gray-200 leading-relaxed whitespace-pre-line">
            {quote}
          </p>
        </div>

        {/* Tech Stack Tags - Bottom */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1.5 bg-gray-700/80 backdrop-blur-sm rounded-full text-gray-200 font-be-vietnam"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* External Link Icon */}
      {link && (
        <div className="absolute top-4 right-4 w-10 h-10 bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      )}
    </div>
  );

  // Wrap in link if URL provided
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
