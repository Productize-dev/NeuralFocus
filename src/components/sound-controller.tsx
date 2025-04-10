"use client"

import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SoundControllerProps {
  volume: number
  onVolumeChange: (volume: number) => void
}

export function SoundController({ volume, onVolumeChange }: SoundControllerProps) {
  // State management with React hooks
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(volume)
  const [isAutoVolume, setIsAutoVolume] = useState(true)
  const [displayVolume, setDisplayVolume] = useState(volume)
  const [targetVolume, setTargetVolume] = useState(volume)

  // For smooth volume transitions
  const transitionRef = useRef<NodeJS.Timeout | null>(null)

  // Handle auto volume changes from timer with proper cleanup
  const handleAutoVolumeChange = (newVolume: number) => {
    if (!isAutoVolume || isMuted) return

    setTargetVolume(newVolume)

    // Clear any existing transition
    if (transitionRef.current) {
      clearInterval(transitionRef.current)
      transitionRef.current = null
    }

    // Create smooth transition
    const startVolume = displayVolume
    const volumeDiff = newVolume - startVolume
    const steps = 10 // Number of steps for transition
    let currentStep = 0

    transitionRef.current = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const interpolatedVolume = Math.round(startVolume + volumeDiff * progress)

      setDisplayVolume(interpolatedVolume)
      onVolumeChange(interpolatedVolume)

      if (currentStep >= steps) {
        if (transitionRef.current) {
          clearInterval(transitionRef.current)
          transitionRef.current = null
        }
      }
    }, 50) // 50ms per step = ~0.5s transition
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setDisplayVolume(newVolume)
    onVolumeChange(newVolume)
    setTargetVolume(newVolume)

    // If user manually changes volume, disable auto-volume temporarily
    setIsAutoVolume(false)

    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      setDisplayVolume(previousVolume)
      onVolumeChange(previousVolume)
    } else {
      setPreviousVolume(displayVolume)
      setIsMuted(true)
      setDisplayVolume(0)
      onVolumeChange(0)
    }
  }

  const toggleAutoVolume = () => {
    setIsAutoVolume(!isAutoVolume)
  }

  // Update display volume when prop changes (for sync with timer)
  useEffect(() => {
    if (isAutoVolume && !isMuted) {
      setDisplayVolume(volume)
    }
  }, [volume, isAutoVolume, isMuted])

  // Expose the auto volume change handler to the window object with proper cleanup
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).handleAutoVolumeChange = handleAutoVolumeChange
    }

    // Clean up the handler when component unmounts
    return () => {
      if (typeof window !== "undefined" && transitionRef.current) {
        clearInterval(transitionRef.current)
        delete (window as any).handleAutoVolumeChange
      }
    }
  }, [displayVolume, isAutoVolume, isMuted])

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <h3 className="text-base sm:text-lg font-medium">Neuroscience-Optimized Volume</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-5 w-5 sm:h-6 sm:w-6 p-0">
                  <Info className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Volume automatically adjusts during your session based on neuroscience research:</p>
                <ul className="list-disc pl-4 mt-1 text-xs">
                  <li>Higher volume at start (~60%) helps override distractions</li>
                  <li>Middle phase (~50%) maintains steady focus</li>
                  <li>Deep work phase (~40%) reduces interference for complex tasks</li>
                  <li>Volume increases near the end as a session completion cue</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs sm:text-sm text-purple-400">{isMuted ? "Muted" : `${displayVolume}%`}</div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoVolume}
            className={`text-xs h-6 sm:h-7 px-2 ${isAutoVolume ? "bg-purple-900/30 border-purple-500/50" : "bg-transparent"}`}
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
        <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-purple-500/10">
          <div className="mb-1 sm:mb-2">
            <h4 className="text-sm sm:font-medium">White Noise</h4>
          </div>
          <p className="text-xs text-gray-400 mb-1 sm:mb-2">Optimal for sustained focus</p>
          <Slider defaultValue={[30]} max={100} step={1} className="my-1 sm:my-2" />
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-purple-500/10">
          <div className="mb-1 sm:mb-2">
            <h4 className="text-sm sm:font-medium">Alpha Waves</h4>
          </div>
          <p className="text-xs text-gray-400 mb-1 sm:mb-2">Enhances creative thinking</p>
          <Slider defaultValue={[45]} max={100} step={1} className="my-1 sm:my-2" />
        </div>
      </div>
    </div>
  )
}
