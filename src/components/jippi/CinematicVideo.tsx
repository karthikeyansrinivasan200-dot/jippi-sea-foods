import { useEffect, useRef } from "react";

export function CinematicVideo({
  src,
  poster,
  className,
  label,
  priority = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  label: string;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      aria-label={label}
      src={src}
      poster={poster}
      autoPlay={priority}
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
    />
  );
}
