"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Braces, Lightbulb, Zap, Moon, Brain } from "lucide-react";

interface BrainwaveSelectorProps {
  activeMode: string;
  onChange: (mode: string) => void;
  onVideoChange?: (url: string) => void;
}

export function BrainwaveSelector({
  activeMode,
  onChange,
  onVideoChange,
}: BrainwaveSelectorProps) {
  const brainwaves = [
    {
      id: "delta",
      name: "Delta",
      description: "Deep sleep, healing, 0.5-4 Hz",
      icon: <Moon className="h-5 w-5 text-blue-400" />,
      color: "border-blue-500/30 bg-blue-500/10",
      activeColor: "border-blue-500 bg-blue-500/20",
      videoUrl: "https://www.youtube.com/watch?v=_WRLrJkXGVY",
    },
    {
      id: "theta",
      name: "Theta",
      description: "Meditation, creativity, 4-8 Hz",
      icon: <Lightbulb className="h-5 w-5 text-teal-400" />,
      color: "border-teal-500/30 bg-teal-500/10",
      activeColor: "border-teal-500 bg-teal-500/20",
      videoUrl: "https://www.youtube.com/watch?v=_WRLrJkXGVY",
    },
    {
      id: "alpha",
      name: "Alpha",
      description: "Relaxed focus, learning, 8-13 Hz",
      icon: <Brain className="h-5 w-5 text-purple-400" />,
      color: "border-purple-500/30 bg-purple-500/10",
      activeColor: "border-purple-500 bg-purple-500/20",
      videoUrl: "https://www.youtube.com/watch?v=Ac7LBzyC76w",
    },
    {
      id: "beta",
      name: "Beta",
      description: "Active thinking, problem solving, 13-30 Hz",
      icon: <Braces className="h-5 w-5 text-orange-400" />,
      color: "border-orange-500/30 bg-orange-500/10",
      activeColor: "border-orange-500 bg-orange-500/20",
      videoUrl: "https://www.youtube.com/watch?v=YWIhyOWxKPw&t=2460s",
    },
    {
      id: "gamma",
      name: "Gamma",
      description: "Peak concentration, cognitive enhancement, 30-100 Hz",
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
      color: "border-yellow-500/30 bg-yellow-500/10",
      activeColor: "border-yellow-500 bg-yellow-500/20",
      videoUrl: "https://youtu.be/lkkGlVWvkLk?si=8XBBPs8mDWD38xe8",
    },
  ];

  const handlePlay = (videoUrl: string) => {
    if (onVideoChange) {
      onVideoChange(videoUrl);
    }
  };

  return (
    <div>
      <div className="mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-medium">
          Neural Frequency Selection
        </h3>
        <p className="text-xs sm:text-sm text-gray-400">
          Select the brainwave frequency that best matches your current task
        </p>
      </div>

      <RadioGroup
        value={activeMode}
        onValueChange={onChange}
        className="grid gap-3 sm:gap-4"
      >
        {brainwaves.map((wave) => (
          <div
            key={wave.id}
            className={`flex items-center space-x-2 sm:space-x-3 rounded-lg border p-3 sm:p-4 transition-all ${
              activeMode === wave.id ? wave.activeColor : wave.color
            }`}
          >
            <RadioGroupItem
              value={wave.id}
              id={wave.id}
              className="data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600"
            />
            <Label
              htmlFor={wave.id}
              className="flex flex-1 cursor-pointer items-center justify-between"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-full bg-gray-900 p-1.5 sm:p-2">
                  {wave.icon}
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium">
                    {wave.name}
                  </p>
                  <p className="text-xs text-gray-400">{wave.description}</p>
                </div>
              </div>
              {wave.videoUrl && activeMode === wave.id && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlay(wave.videoUrl);
                  }}
                  className="relative group px-4 py-1.5 text-sm font-medium text-white rounded-md transition-all duration-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-opacity group-hover:opacity-90"></div>
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-70 blur-sm bg-gradient-to-r from-purple-600 to-indigo-600"></div>
                  <span className="relative flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play
                  </span>
                </button>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-purple-500/20">
        <h4 className="text-sm sm:text-base font-medium text-purple-300 mb-1 sm:mb-2">
          How It Works
        </h4>
        <p className="text-xs sm:text-sm text-gray-300">
          Our neural frequency technology uses scientifically calibrated sound
          waves to entrain your brain to the selected frequency, optimizing your
          mental state for the task at hand.
        </p>
      </div>

      <div className="mt-2 sm:mt-3 p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-xs sm:text-sm text-gray-400">
          Note: The provided audio tracks are recommendations only. Users are
          free to use their own preferred audio or video content for each
          frequency range.
        </p>
      </div>
    </div>
  );
}
