"use client";

import { useState, useRef, useEffect } from "react";
import { NeuralHeader } from "@/components/neural-header";
import { FocusTimer } from "@/components/focus-timer";
import { SoundController } from "@/components/sound-controller";
import { MediaPlayer } from "@/components/media-player";
import { FocusChecklist } from "@/components/focus-checklist";
import { BrainwaveSelector } from "@/components/brainwave-selector";
import { NeuroscienceTips } from "@/components/neuroscience-tips";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, ListChecks, Music } from "lucide-react";

export default function Home() {
  // State management with React hooks
  const [focusTask, setFocusTask] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [volume, setVolume] = useState(57);
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=_egA9RZrD5k"
  );
  const [activeTab, setActiveTab] = useState("focus");
  const [brainwaveMode, setBrainwaveMode] = useState("alpha");

  // Use a stable reference for the volume change handler
  const autoVolumeChangeRef = useRef<((volume: number) => void) | null>(null);

  // Connect to the sound controller's auto volume change function with proper cleanup
  useEffect(() => {
    const handleAutoVolumeChangeGlobal = (window as any).handleAutoVolumeChange;

    if (handleAutoVolumeChangeGlobal) {
      autoVolumeChangeRef.current = handleAutoVolumeChangeGlobal;
    }

    // No need to return cleanup as we're just reading a value
  }, []);

  // Event handlers using modern patterns
  const handleStartFocus = () => {
    if (focusTask.trim()) {
      setIsTimerActive(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleVolumeSequenceChange = (newVolume: number) => {
    autoVolumeChangeRef.current?.(newVolume);
  };

  const handleVideoChange = (url: string) => {
    setVideoUrl(url);
    setActiveTab("sounds");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white">
      <NeuralHeader />

      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-400" />
                Neural Focus Engine
              </h2>

              <div className="relative">
                <input
                  type="text"
                  value={focusTask}
                  onChange={(e) => setFocusTask(e.target.value)}
                  placeholder="What would you like to focus on today?"
                  className="w-full bg-gray-900/70 border border-purple-500/30 rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 pr-[130px] sm:pr-[150px]"
                />
                <button
                  onClick={handleStartFocus}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg transition-all duration-200 flex items-center"
                >
                  Start Focusing
                </button>
              </div>

              {isTimerActive && (
                <FocusTimer
                  task={focusTask}
                  onVolumeSequenceChange={handleVolumeSequenceChange}
                />
              )}
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
              <Tabs
                defaultValue={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger
                    value="focus"
                    className="data-[state=active]:bg-purple-600"
                  >
                    <Brain className="w-5 h-5 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Focus</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="sounds"
                    className="data-[state=active]:bg-purple-600"
                  >
                    <Music className="w-5 h-5 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Sounds</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="checklist"
                    className="data-[state=active]:bg-purple-600"
                  >
                    <ListChecks className="w-5 h-5 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Checklist</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="focus" className="mt-0">
                  <BrainwaveSelector
                    activeMode={brainwaveMode}
                    onChange={setBrainwaveMode}
                    onVideoChange={handleVideoChange}
                  />
                </TabsContent>

                <TabsContent value="sounds" className="mt-0"></TabsContent>

                <TabsContent value="checklist" className="mt-0">
                  <FocusChecklist />
                </TabsContent>
              </Tabs>

              {/* Keep SoundController and MediaPlayer mounted but toggle visibility */}
              <div className={`${activeTab === "sounds" ? "block" : "hidden"}`}>
                <SoundController
                  volume={volume}
                  onVolumeChange={handleVolumeChange}
                />
                <MediaPlayer url={videoUrl} onUrlChange={handleVideoChange} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Neuroscience Tips</h2>
              <NeuroscienceTips brainwaveMode={brainwaveMode} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
