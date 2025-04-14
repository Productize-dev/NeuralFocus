"use client";

import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SoundControllerProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function SoundController({
  volume,
  onVolumeChange,
}: SoundControllerProps) {
  // State management with React hooks
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [isAutoVolume, setIsAutoVolume] = useState(true);
  const [displayVolume, setDisplayVolume] = useState(volume);
  const [targetVolume, setTargetVolume] = useState(volume);
  const [rainVolume, setRainVolume] = useState(0);
  const [wavesVolume, setWavesVolume] = useState(0);

  // For smooth volume transitions
  const transitionRef = useRef<NodeJS.Timeout | null>(null);

  // Add audio element ref for rain sound
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);
  // Add audio element ref for alpha waves
  const wavesAudioRef = useRef<HTMLAudioElement | null>(null);

  // Function to emit volume change event
  const emitVolumeChange = (newVolume: number) => {
    const event = new CustomEvent("focusSessionVolumeChange", {
      detail: { volume: newVolume / 100 },
    });
    window.dispatchEvent(event);
  };

  // Listen for volume updates from focus timer
  useEffect(() => {
    const handleNeuroscienceVolumeUpdate = (event: CustomEvent) => {
      if (!isAutoVolume) return;

      const { volume, isRunning } = event.detail;

      // Only handle auto volume changes if the session is running
      if (isRunning) {
        handleAutoVolumeChange(volume);
      }
    };

    const handleRestoreFocusVolume = (event: CustomEvent) => {
      const { targetVolume } = event.detail;

      // Enable auto-volume mode and update target
      setIsAutoVolume(true);
      setTargetVolume(targetVolume);

      // Directly set the volume to match focus session
      setDisplayVolume(targetVolume);
      onVolumeChange(targetVolume);
      emitVolumeChange(targetVolume);
    };

    window.addEventListener(
      "updateNeuroscienceVolume",
      handleNeuroscienceVolumeUpdate as EventListener
    );

    window.addEventListener(
      "restoreFocusVolume",
      handleRestoreFocusVolume as EventListener
    );

    return () => {
      if (transitionRef.current) {
        clearInterval(transitionRef.current);
        transitionRef.current = null;
      }
      window.removeEventListener(
        "updateNeuroscienceVolume",
        handleNeuroscienceVolumeUpdate as EventListener
      );
      window.removeEventListener(
        "restoreFocusVolume",
        handleRestoreFocusVolume as EventListener
      );
    };
  }, [isAutoVolume]);

  const toggleAutoVolume = () => {
    const newAutoState = !isAutoVolume;
    setIsAutoVolume(newAutoState);

    // If turning auto back on, trigger volume restoration
    if (newAutoState) {
      window.dispatchEvent(new Event("restoreFocusVolume"));
    }
  };

  // Handle auto volume changes from timer with proper cleanup
  const handleAutoVolumeChange = (newVolume: number) => {
    if (!isAutoVolume || isMuted) return;

    // Clear any existing transition
    if (transitionRef.current) {
      clearInterval(transitionRef.current);
      transitionRef.current = null;
    }

    // Set target volume
    setTargetVolume(newVolume);

    // Calculate steps for gradual change
    const startVolume = displayVolume;
    const volumeDiff = newVolume - startVolume;

    // If no change needed, return early
    if (volumeDiff === 0) return;

    // Use smaller steps for smoother transition
    const totalSteps = Math.abs(volumeDiff);
    let currentStep = 0;
    let lastDisplayedVolume = startVolume;

    // Create gradual transition
    transitionRef.current = setInterval(() => {
      currentStep++;

      // Calculate the next volume value with linear interpolation
      const progress = currentStep / totalSteps;
      const interpolatedVolume = Math.round(
        startVolume + volumeDiff * progress
      );

      // Only update display and emit if the volume has changed by at least 1%
      if (Math.abs(interpolatedVolume - lastDisplayedVolume) >= 1) {
        lastDisplayedVolume = interpolatedVolume;
        setDisplayVolume(interpolatedVolume);
        onVolumeChange(interpolatedVolume);
        emitVolumeChange(interpolatedVolume);
      }

      // Stop when we reach the target
      if (currentStep >= totalSteps) {
        if (transitionRef.current) {
          clearInterval(transitionRef.current);
          transitionRef.current = null;
        }
        // Final update to ensure we reach target
        setDisplayVolume(newVolume);
        onVolumeChange(newVolume);
        emitVolumeChange(newVolume);
      }
    }, 50);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];

    // Clear any ongoing transition
    if (transitionRef.current) {
      clearInterval(transitionRef.current);
      transitionRef.current = null;
    }

    // Only update if the volume has actually changed
    if (newVolume !== displayVolume) {
      // Round to prevent jitter from slider
      const roundedVolume = Math.round(newVolume);
      setDisplayVolume(roundedVolume);
      setTargetVolume(roundedVolume);

      // Update the volume system
      onVolumeChange(roundedVolume);
      emitVolumeChange(roundedVolume);

      // Always disable auto-volume when manually changing
      setIsAutoVolume(false);

      if (roundedVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setDisplayVolume(previousVolume);
      onVolumeChange(previousVolume);
      emitVolumeChange(previousVolume);
    } else {
      setPreviousVolume(displayVolume);
      setIsMuted(true);
      setDisplayVolume(0);
      onVolumeChange(0);
      emitVolumeChange(0);
    }
  };

  // Update display volume when prop changes
  useEffect(() => {
    // Temporarily disabled auto-sync to debug glitch
    if (!isAutoVolume) {
      setDisplayVolume(volume);
      setTargetVolume(volume);
    }
  }, [volume, isAutoVolume]);

  // Expose the auto volume change handler to the window object
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).handleAutoVolumeChange = handleAutoVolumeChange;
    }

    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).handleAutoVolumeChange;
      }
      // Clean up any ongoing transition
      if (transitionRef.current) {
        clearInterval(transitionRef.current);
        transitionRef.current = null;
      }
    };
  }, [isAutoVolume, isMuted]); // Add relevant dependencies

  // Initialize rain and alpha waves audio
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Initializing sounds...");
      rainAudioRef.current = new Audio("/rain.mp3");
      wavesAudioRef.current = new Audio("/waves.mp3");

      if (rainAudioRef.current) {
        rainAudioRef.current.loop = true;
        rainAudioRef.current.volume = rainVolume / 100;
      }

      if (wavesAudioRef.current) {
        wavesAudioRef.current.loop = true;
        wavesAudioRef.current.volume = wavesVolume / 100;
      }
    }

    return () => {
      if (rainAudioRef.current) {
        rainAudioRef.current.pause();
        rainAudioRef.current = null;
      }
      if (wavesAudioRef.current) {
        wavesAudioRef.current.pause();
        wavesAudioRef.current = null;
      }
    };
  }, []);

  // Handle rain sound volume change
  const handleRainVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setRainVolume(newVolume);

    if (rainAudioRef.current) {
      rainAudioRef.current.volume = newVolume / 100;
      if (newVolume > 0 && rainAudioRef.current.paused) {
        rainAudioRef.current.play().catch(console.error);
      } else if (newVolume === 0) {
        rainAudioRef.current.pause();
      }
    }
  };

  // Handle alpha waves volume change
  const handleWavesVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setWavesVolume(newVolume);

    if (wavesAudioRef.current) {
      wavesAudioRef.current.volume = newVolume / 100;
      if (newVolume > 0 && wavesAudioRef.current.paused) {
        wavesAudioRef.current.play().catch(console.error);
      } else if (newVolume === 0) {
        wavesAudioRef.current.pause();
      }
    }
  };

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <h3 className="text-base sm:text-lg font-medium">Volume</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 sm:h-6 sm:w-6 p-0"
                >
                  <Info className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Volume adjusts automatically during focus sessions to help
                  maintain optimal concentration:
                </p>
                <ul className="list-disc pl-4 mt-1 text-xs">
                  <li>Initial phase: Higher volume to help you focus</li>
                  <li>Middle phase: Balanced volume for sustained attention</li>
                  <li>Deep work phase: Lower volume for complex tasks</li>
                  <li>
                    Final phase: Gradual increase as session completion signal
                  </li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs sm:text-sm text-purple-400">
            {isMuted ? "Muted" : `${Math.round(displayVolume)}%`}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoVolume}
            className={`text-xs h-6 sm:h-7 px-2 ${
              isAutoVolume
                ? "bg-purple-900/30 border-purple-500/50"
                : "bg-transparent"
            }`}
          >
            Auto
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="text-gray-400 hover:text-white h-8 w-8 sm:h-10 sm:w-10"
        >
          {isMuted || displayVolume === 0 ? (
            <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </Button>

        <Slider
          value={[displayVolume]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="flex-1"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-gray-900/70 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Rain Sound</h4>
            <span className="text-xs text-gray-400">{rainVolume}%</span>
          </div>
          <Slider
            value={[rainVolume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleRainVolumeChange}
          />
          <p className="text-xs text-gray-500 mt-1">
            Calming rain for enhanced focus
          </p>
        </div>

        <div className="bg-gray-900/70 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Alpha Waves</h4>
            <span className="text-xs text-gray-400">{wavesVolume}%</span>
          </div>
          <Slider
            value={[wavesVolume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleWavesVolumeChange}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enhances creative thinking
          </p>
        </div>
      </div>
    </div>
  );
}
