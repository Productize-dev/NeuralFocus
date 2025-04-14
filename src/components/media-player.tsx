"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Declare YouTube Player type
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          height: string;
          width: string;
          videoId: string;
          playerVars?: {
            enablejsapi?: number;
            origin?: string;
          };
          events?: {
            onReady?: (event: any) => void;
          };
        }
      ) => any;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface MediaPlayerProps {
  url: string;
  onUrlChange: (url: string) => void;
}

export function MediaPlayer({ url, onUrlChange }: MediaPlayerProps) {
  const [inputUrl, setInputUrl] = useState<string>(url);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer(getVideoIdFromUrl(url));
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Listen for volume change events
  useEffect(() => {
    const handleVolumeChange = (event: CustomEvent) => {
      const volume = Math.round(event.detail.volume * 100); // Convert to percentage
      if (playerRef.current?.setVolume) {
        playerRef.current.setVolume(volume);
      }
    };

    window.addEventListener(
      "focusSessionVolumeChange",
      handleVolumeChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "focusSessionVolumeChange",
        handleVolumeChange as EventListener
      );
    };
  }, []);

  // Initialize player when URL changes
  useEffect(() => {
    const videoId = getVideoIdFromUrl(url);
    if (videoId && playerRef.current) {
      playerRef.current.loadVideoById(videoId);
    }
  }, [url]);

  const initializePlayer = (videoId: string | null) => {
    if (!videoId || !window.YT || !containerRef.current) return;

    playerRef.current = new window.YT.Player("youtube-player", {
      height: "100%",
      width: "100%",
      videoId: videoId,
      playerVars: {
        enablejsapi: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (event: any) => {
          // Set initial volume
          event.target.setVolume(60);
        },
      },
    });
  };

  const getVideoIdFromUrl = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handlePlay = () => {
    onUrlChange(inputUrl);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Neural-Enhanced Media</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Our algorithm analyzes audio frequencies to enhance focus based
                on neuroscience research.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="flex-1 bg-gray-900/70 border border-purple-500/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
        />
        <Button
          onClick={handlePlay}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
        >
          <Play className="h-4 w-4 mr-2" />
          Play
        </Button>
      </div>

      <div
        ref={containerRef}
        className="relative pt-[56.25%] rounded-lg overflow-hidden"
      >
        <div
          id="youtube-player"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
}
