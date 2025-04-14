"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  Volume2,
  Coffee,
  SkipForward,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface FocusTimerProps {
  task: string;
  onVolumeSequenceChange?: (volume: number) => void;
}

export function FocusTimer({ task, onVolumeSequenceChange }: FocusTimerProps) {
  // State management with React hooks
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState("25");
  const [currentVolume, setCurrentVolume] = useState(60);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [volumePhase, setVolumePhase] = useState(1);

  // Break timer states
  const [isBreakMode, setIsBreakMode] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60); // 5 minutes default break
  const [breakProgress, setBreakProgress] = useState(0);
  const [breakDuration, setBreakDuration] = useState(5); // 5 minutes default
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isBreakRunning, setIsBreakRunning] = useState(false);

  // Store total time for progress calculation
  const totalTimeRef = useRef(25 * 60);
  const totalBreakTimeRef = useRef(5 * 60);

  // Volume sequencing phases - updated with detailed specifications
  const volumePhases = {
    "25": [
      { until: 5 * 60, volume: 60 }, // Phase 1: 0-5 minutes, 60% volume
      { until: 15 * 60, volume: 50 }, // Phase 2: 5-15 minutes, 50% volume
      { until: 24 * 60, volume: 40 }, // Phase 3: 15-24 minutes, 40% volume
      { until: 25 * 60, volume: 60 }, // Phase 4: 24-25 minutes, 60% volume
    ],
    "90": [
      { until: 10 * 60, volume: 60 }, // Phase 1: 0-10 minutes, 60% volume - Helps mask distractions and prime the brain
      { until: 45 * 60, volume: 50 }, // Phase 2: 10-45 minutes, 50% volume - Maintain steady effort with moderate noise
      { until: 80 * 60, volume: 40 }, // Phase 3: 45-80 minutes, 40% volume - Sustain deep focus during demanding tasks
      { until: 90 * 60, volume: 60 }, // Phase 4: 80-90 minutes, gradually back to 60% - Signal final stretch
    ],
    "180": [
      { until: 20 * 60, volume: 60 }, // Phase 1: 0-20 minutes, 60% volume
      { until: 90 * 60, volume: 50 }, // Phase 2: 20-90 minutes, 50% volume
      { until: 170 * 60, volume: 40 }, // Phase 3: 90-170 minutes, 40% volume
      { until: 180 * 60, volume: 60 }, // Phase 4: 170-180 minutes, 60% volume
    ],
    "360": [
      { until: 20 * 60, volume: 60 }, // Phase 1: 0-20 minutes, 60% volume
      { until: 90 * 60, volume: 50 }, // Phase 2: 20-90 minutes, 50% volume
      { until: 180 * 60, volume: 40 }, // Phase 3: 90-180 minutes, 40% volume
      { until: 360 * 60, volume: 60 }, // Phase 4: 180-360 minutes, gradually back to 60% volume
    ],
  };

  // Previous time to track phase changes
  const prevTimeRef = useRef(timeLeft);

  // Interval ref for proper cleanup
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breakIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate interpolated volume between phases with gradual changes
  const calculateInterpolatedVolume = (timeElapsed: number) => {
    const phases = volumePhases[selectedDuration as keyof typeof volumePhases];
    let currentPhase = 0;
    let nextPhase = 1;

    // Find current and next phases
    for (let i = 0; i < phases.length; i++) {
      if (timeElapsed <= phases[i].until / 60) {
        currentPhase = i;
        nextPhase = Math.min(i + 1, phases.length - 1);
        break;
      }
    }

    // Update volume phase
    setVolumePhase(currentPhase + 1);

    // Get current and next phase volumes
    const currentPhaseVolume = phases[currentPhase].volume;
    const nextPhaseVolume = phases[nextPhase].volume;

    // Calculate time within current phase
    const phaseStartTime =
      currentPhase > 0 ? phases[currentPhase - 1].until / 60 : 0;
    const phaseEndTime = phases[currentPhase].until / 60;
    const phaseDuration = phaseEndTime - phaseStartTime;
    const timeInPhase = timeElapsed - phaseStartTime;

    // Calculate transition progress (0 to 1)
    const progress = Math.min(1, Math.max(0, timeInPhase / phaseDuration));

    // Calculate target volume
    const targetVolume = Math.round(
      currentPhaseVolume + (nextPhaseVolume - currentPhaseVolume) * progress
    );

    return {
      targetVolume,
      currentPhase: currentPhase + 1,
    };
  };

  // Set timer duration based on selection
  const handleDurationChange = (duration: string) => {
    setSelectedDuration(duration);
    const minutes = Number.parseInt(duration);
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    totalTimeRef.current = seconds;
    setProgress(0);
    setIsRunning(false);
    prevTimeRef.current = seconds;
    setTimeElapsed(0);

    // Reset volume to initial phase
    const initialVolume =
      volumePhases[duration as keyof typeof volumePhases][0].volume;
    setCurrentVolume(initialVolume);
    setVolumePhase(1);

    // Adjust break duration based on focus duration
    if (duration === "25") {
      setBreakDuration(5);
      setBreakTimeLeft(5 * 60);
      totalBreakTimeRef.current = 5 * 60;
    } else if (duration === "90") {
      setBreakDuration(15);
      setBreakTimeLeft(15 * 60);
      totalBreakTimeRef.current = 15 * 60;
    } else {
      setBreakDuration(30);
      setBreakTimeLeft(30 * 60);
      totalBreakTimeRef.current = 30 * 60;
    }
  };

  // Handle break duration change
  const handleBreakDurationChange = (value: number[]) => {
    const newDuration = value[0];
    setBreakDuration(newDuration);
    setBreakTimeLeft(newDuration * 60);
    totalBreakTimeRef.current = newDuration * 60;
  };

  // Effect for timer countdown and volume adjustment
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          const newTimeElapsed = totalTimeRef.current - newTime;
          setTimeElapsed(newTimeElapsed);

          // Calculate progress
          const progressPercent =
            ((totalTimeRef.current - newTime) / totalTimeRef.current) * 100;
          setProgress(progressPercent);

          // Calculate volume changes
          const { targetVolume, currentPhase } = calculateInterpolatedVolume(
            newTimeElapsed / 60
          );

          // Update internal state
          setVolumePhase(currentPhase);
          setCurrentVolume(targetVolume);

          // Emit volume update event only if auto-volume is enabled
          window.dispatchEvent(
            new CustomEvent("updateNeuroscienceVolume", {
              detail: {
                volume: targetVolume,
                phase: currentPhase,
                isRunning: true,
                timeElapsed: newTimeElapsed,
                totalTime: totalTimeRef.current,
              },
            })
          );

          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Play bell sound when focus session ends
      const audio = new Audio("/bell.mp3");
      audio.play().catch((e) => console.log("Bell sound failed:", e));

      // Increment completed sessions
      setSessionsCompleted((prev) => prev + 1);

      // Switch to break mode
      setIsBreakMode(true);

      // Auto-start break if needed
      setIsBreakRunning(true);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, timeLeft, onVolumeSequenceChange, selectedDuration]);

  // Break timer effect
  useEffect(() => {
    if (isBreakRunning && breakTimeLeft > 0) {
      breakIntervalRef.current = setInterval(() => {
        setBreakTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          setBreakProgress(
            ((totalBreakTimeRef.current - newTime) /
              totalBreakTimeRef.current) *
              100
          );
          return newTime;
        });
      }, 1000);
    } else if (breakTimeLeft === 0 && isBreakRunning) {
      setIsBreakRunning(false);

      // Play furin sound when break ends
      const audio = new Audio("/furin.mp3");
      audio.play().catch((e) => console.log("Furin sound failed:", e));

      // Reset for next focus session
      setIsBreakMode(false);
      setTimeLeft(totalTimeRef.current);
      setProgress(0);
      setTimeElapsed(0);

      // Reset volume to initial phase
      const initialVolume =
        volumePhases[selectedDuration as keyof typeof volumePhases][0].volume;
      setCurrentVolume(initialVolume);
      setVolumePhase(1);

      // Reset break timer for next break
      setBreakTimeLeft(breakDuration * 60);
      setBreakProgress(0);
    }

    return () => {
      if (breakIntervalRef.current) {
        clearInterval(breakIntervalRef.current);
        breakIntervalRef.current = null;
      }
    };
  }, [isBreakRunning, breakTimeLeft, breakDuration, selectedDuration]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    const newIsRunning = !isRunning;
    setIsRunning(newIsRunning);

    // Initialize volume for first phase when starting
    if (newIsRunning) {
      const phases =
        volumePhases[selectedDuration as keyof typeof volumePhases];
      const initialVolume = phases[0].volume;
      setCurrentVolume(initialVolume);
      setVolumePhase(1);
    }
  };

  const toggleBreakTimer = () => {
    setIsBreakRunning(!isBreakRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(Number.parseInt(selectedDuration) * 60);
    setProgress(0);
    prevTimeRef.current = Number.parseInt(selectedDuration) * 60;
    setTimeElapsed(0);

    // Reset volume to initial phase
    const initialVolume =
      volumePhases[selectedDuration as keyof typeof volumePhases][0].volume;
    setCurrentVolume(initialVolume);
    setVolumePhase(1);

    if (onVolumeSequenceChange) {
      onVolumeSequenceChange(initialVolume);
    }
  };

  const skipBreak = () => {
    setIsBreakRunning(false);
    setIsBreakMode(false);
    setBreakTimeLeft(breakDuration * 60);
    setBreakProgress(0);

    // Reset for next focus session
    setTimeLeft(totalTimeRef.current);
    setProgress(0);
    setTimeElapsed(0);

    // Reset volume to initial phase
    const initialVolume =
      volumePhases[selectedDuration as keyof typeof volumePhases][0].volume;
    setCurrentVolume(initialVolume);
    setVolumePhase(1);
  };

  const restoreFocusVolume = () => {
    // Calculate the exact volume for the current time in the session
    const { targetVolume, currentPhase } = calculateInterpolatedVolume(
      timeElapsed / 60
    );

    // Dispatch event to trigger volume restoration
    window.dispatchEvent(
      new CustomEvent("restoreFocusVolume", {
        detail: {
          targetVolume,
          phase: currentPhase,
          isRunning,
          timeElapsed,
          totalTime: totalTimeRef.current,
        },
      })
    );
  };

  return (
    <div className="mt-6 bg-gray-900/50 rounded-lg p-6 border border-purple-500/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">
          {isBreakMode ? "Break Time" : "Focus Session"}
        </h3>
        {sessionsCompleted > 0 && (
          <div className="text-sm text-purple-300">
            Sessions completed: {sessionsCompleted}
          </div>
        )}
      </div>

      {!isBreakMode && (
        <div className="mb-4">
          <p className="text-gray-300 mb-2">Currently focusing on:</p>
          <p className="text-lg font-medium">{task}</p>
        </div>
      )}

      {!isBreakMode ? (
        <>
          <Tabs
            defaultValue={selectedDuration}
            onValueChange={handleDurationChange}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <h4 className="font-medium">Session Duration</h4>
            </div>
            <TabsList className="grid grid-cols-4 mb-2 text-xs sm:text-sm">
              <TabsTrigger
                value="25"
                className="data-[state=active]:bg-purple-600 px-1 sm:px-2"
              >
                25m
              </TabsTrigger>
              <TabsTrigger
                value="90"
                className="data-[state=active]:bg-purple-600 px-1 sm:px-2"
              >
                90m
              </TabsTrigger>
              <TabsTrigger
                value="180"
                className="data-[state=active]:bg-purple-600 px-1 sm:px-2"
              >
                3h
              </TabsTrigger>
              <TabsTrigger
                value="360"
                className="data-[state=active]:bg-purple-600 px-1 sm:px-2"
              >
                6h
              </TabsTrigger>
            </TabsList>
            <p className="text-xs text-gray-400 mt-1">
              {selectedDuration === "25" && "Pomodoro focus (25 min)"}
              {selectedDuration === "90" && "Basic sleep cycle (90 min)"}
              {selectedDuration === "180" && "Deep work session (3 hours)"}
              {selectedDuration === "360" && "Extended flow state (6 hours)"}
            </p>
          </Tabs>

          <div className="flex flex-col items-center my-6 sm:my-8">
            <div className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              {formatTime(timeLeft)}
            </div>

            <Progress value={progress} className="w-full h-2 mb-4 sm:mb-6" />

            <div className="flex items-center gap-4 mb-6">
              <Button
                onClick={toggleTimer}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0"
              >
                {isRunning ? (
                  <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </Button>

              <Button
                onClick={resetTimer}
                variant="outline"
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0 border-gray-600"
              >
                <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {isRunning && (
              <div className="w-full bg-gray-800/50 rounded-lg p-4 mb-4 text-center space-y-2">
                <div className="text-sm text-gray-300">
                  Time Elapsed: {formatTime(timeElapsed)}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-purple-300">
                  <Volume2 className="h-4 w-4 text-purple-400" />
                  Current Volume: {currentVolume}%
                  <span className="text-xs text-gray-400">
                    (Phase {volumePhase})
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  Time Remaining: {formatTime(timeLeft)}
                </div>

                <Button
                  onClick={restoreFocusVolume}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  Restore Focus Volume
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        // Break Timer UI
        <div className="flex flex-col items-center my-6">
          <div className="mb-6 w-full">
            <div className="flex items-center gap-2 mb-2">
              <Coffee className="h-5 w-5 text-teal-400" />
              <h4 className="font-medium">Break Duration</h4>
              <span className="text-sm text-teal-400 ml-auto">
                {breakDuration} min
              </span>
            </div>
            <Slider
              value={[breakDuration]}
              min={1}
              max={30}
              step={1}
              onValueChange={handleBreakDurationChange}
              disabled={isBreakRunning}
              className="mb-2"
            />
            <p className="text-xs text-gray-400">
              {breakDuration < 5
                ? "Quick refresh"
                : breakDuration < 15
                ? "Short break"
                : "Long recovery"}
            </p>
          </div>

          <div className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
            {formatTime(breakTimeLeft)}
          </div>

          <Progress value={breakProgress} className="w-full h-2 mb-4 sm:mb-6" />

          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={toggleBreakTimer}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0"
            >
              {isBreakRunning ? (
                <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>

            <Button
              onClick={skipBreak}
              variant="outline"
              className="rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0 border-gray-600"
            >
              <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <div className="w-full bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-300">
              Take a break! Step away from your screen, stretch, hydrate, or
              practice deep breathing.
            </p>
            <p className="text-xs text-teal-400 mt-2">
              Your next focus session will begin automatically when the break
              ends.
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
        <p className="text-xs text-gray-300">
          <span className="font-medium text-purple-300">
            Neural Volume Sequencing:
          </span>{" "}
          Volume automatically adjusts throughout your session based on
          neuroscience research to optimize focus and cognitive performance.
        </p>
      </div>
    </div>
  );
}
