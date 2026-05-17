"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full border-t border-b border-[#E8E8E8] group"
      style={{ height: "100svh" }}
    >
      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          aria-label="Frovora Bakehouse brand video"
        >
          <source src="/video/frovora-brand.mp4" type="video/mp4" />
        </video>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-8 right-8 flex items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all border border-white/20"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-1" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all border border-white/20"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>
        </div>

        {/* Fallback gradient when video hasn't loaded */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A8C] to-[#0D0D0D] -z-10" />
      </motion.div>
    </section>
  );
}
