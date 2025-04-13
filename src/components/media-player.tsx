"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MediaPlayerProps {
  url: string;
  onUrlChange: (url: string) => void;
}

export function MediaPlayer({ url, onUrlChange }: MediaPlayerProps) {
  const [inputUrl, setInputUrl] = useState<string>(url);

  const handlePlay = () => {
    onUrlChange(inputUrl);
  };

  // Function to extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const embedUrl = getYouTubeEmbedUrl(url);

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
          placeholder="Enter YouTube URL for focus music"
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

      {embedUrl && (
        <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
