"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroVideoProps {
    videoSrc?: string;
    posterSrc?: string; // Restored poster prop
    onVideoEnd?: () => void;
    children?: React.ReactNode;
}

export default function HeroVideo({
    videoSrc = "/hero-video.mp4",
    posterSrc = "/hero-poster.png", // Use the new poster by default
    onVideoEnd,
    children,
}: HeroVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [hasVideoEnded, setHasVideoEnded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [showPoster, setShowPoster] = useState(true);

    // Unified load handler
    const markVideoAsLoaded = () => {
        if (!isVideoLoaded) {
            setIsVideoLoaded(true);
            setShowPoster(false);
        }
    };

    // Handle video end - freeze on last frame
    const handleVideoEnd = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = videoRef.current.duration - 0.01;
        }
        setHasVideoEnded(true);
        onVideoEnd?.();
    };

    // Check readyState on mount and when ref changes
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.readyState >= 3) {
            markVideoAsLoaded();
        }

        // Force play if needed
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was prevented
                console.log("Autoplay prevented");
            });
        }
    }, [videoRef.current]);

    // Handle video error - show poster as fallback
    const handleVideoError = () => {
        setVideoError(true);
        setHasVideoEnded(true); // Show content immediately
    };

    // If no video source or video fails, show poster immediately
    useEffect(() => {
        if (videoError || !videoSrc) {
            setHasVideoEnded(true);
        }
    }, [videoError, videoSrc]);

    return (
        <div className="hero-video-container">
            {/* Poster Image (Fallback & Initial State) */}
            <AnimatePresence>
                {(showPoster || videoError) && (
                    <motion.div
                        className="hero-video-poster"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }} // Faster seamless transition
                    >
                        <img
                            src={posterSrc}
                            alt="Hero"
                            className="hero-video-poster-img"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Layer */}
            {!videoError && (
                <motion.video
                    ref={videoRef}
                    className="hero-video-element"
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    poster={posterSrc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ willChange: "opacity" }}
                    onLoadedData={markVideoAsLoaded}
                    onCanPlay={markVideoAsLoaded}
                    onPlaying={markVideoAsLoaded}
                    onEnded={handleVideoEnd}
                    onError={handleVideoError}
                >
                    <source src={videoSrc} type="video/mp4" />
                </motion.video>
            )}

            {/* HIGH-PERFORMANCE MASTER OVERLAY */}
            {/* Consolidated 5 layers into 1 for maximum smoothness */}
            <div className="hero-master-overlay" />

            {/* Content Layer */}
            <div className="hero-video-content">
                <div className="hero-content-inner">
                    {children}
                </div>
            </div>
        </div>
    );
}
