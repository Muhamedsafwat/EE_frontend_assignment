import { useState } from "react";
import { ImageIcon } from "./icons";

interface ThumbnailProps {
  src?: string;
  alt: string;
  className?: string;
}

/**
 * Renders a product/step image, gracefully falling back to a placeholder
 * icon when no source is provided or the image fails to load.
 */
function Thumbnail({ src, alt, className = "" }: ThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 ${className}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <ImageIcon className="h-1/2 w-1/2 text-icon" />
      )}
    </div>
  );
}

export default Thumbnail;
