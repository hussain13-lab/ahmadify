import React, { useState } from 'react';

interface LogoImageProps {
  className?: string;
  alt?: string;
  customSrc?: string;
}

export const LogoImage: React.FC<LogoImageProps> = ({
  className = "w-full h-full object-contain",
  alt = "ahmadify.store logo",
  customSrc
}) => {
  const sources = [
    ...(customSrc ? [customSrc] : []),
    '/logo.png',
    '/logo.jpg',
    '/ahmadify_logo.jpg'
  ];

  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleError = () => {
    if (currentSourceIndex < sources.length - 1) {
      setCurrentSourceIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  if (allFailed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-sm rounded-lg shadow-inner select-none">
        A
      </div>
    );
  }

  return (
    <img
      src={sources[currentSourceIndex]}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};
