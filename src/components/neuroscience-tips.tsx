interface NeuroscienceTipsProps {
  brainwaveMode: string
}

export function NeuroscienceTips({ brainwaveMode }: NeuroscienceTipsProps) {
  const tips = {
    delta: [
      "Limit blue light exposure before deep rest sessions",
      "Maintain a cool room temperature (65-68°F/18-20°C) for optimal recovery",
      "Practice progressive muscle relaxation to enhance delta wave production",
    ],
    theta: [
      "Try open monitoring meditation to enhance theta waves",
      "Engage in creative visualization before problem-solving",
      "Schedule creative work during your natural energy dips",
    ],
    alpha: [
      "Take short breaks every 25 minutes to maintain alpha state",
      "Use peripheral vision exercises to induce alpha waves",
      "Practice mindful breathing for 2 minutes before starting work",
    ],
    beta: [
      "Consume 200-400mg of caffeine for enhanced beta wave activity",
      "Use active recall techniques when learning new information",
      "Alternate between standing and sitting to maintain alertness",
    ],
    gamma: [
      "Practice loving-kindness meditation to boost gamma waves",
      "Engage in cross-lateral movements to enhance whole-brain synchronization",
      "Challenge yourself with novel, complex tasks to stimulate gamma activity",
    ],
  }

  const currentTips = tips[brainwaveMode as keyof typeof tips] || tips.alpha

  const brainwaveInfo = {
    delta: {
      title: "Delta Waves (0.5-4 Hz)",
      description:
        "Associated with deep, dreamless sleep and healing. Essential for physical recovery and immune function.",
    },
    theta: {
      title: "Theta Waves (4-8 Hz)",
      description:
        "Present during meditation, daydreaming, and REM sleep. Enhances creativity and emotional processing.",
    },
    alpha: {
      title: "Alpha Waves (8-13 Hz)",
      description:
        "The bridge between conscious and subconscious. Optimal for learning, relaxed focus, and flow states.",
    },
    beta: {
      title: "Beta Waves (13-30 Hz)",
      description: "Dominant during active thinking, problem-solving, and focused tasks requiring alertness.",
    },
    gamma: {
      title: "Gamma Waves (30-100 Hz)",
      description:
        "Associated with peak concentration, cognitive enhancement, and simultaneous processing of information.",
    },
  }

  const currentInfo = brainwaveInfo[brainwaveMode as keyof typeof brainwaveInfo] || brainwaveInfo.alpha

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-purple-500/20">
        <h3 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">{currentInfo.title}</h3>
        <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">{currentInfo.description}</p>
      </div>

      <div>
        <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">Optimization Tips:</h3>
        <ul className="space-y-1.5 sm:space-y-2">
          {currentTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-purple-400 mt-0.5 sm:mt-1">•</span>
              <span className="text-xs sm:text-sm text-gray-300">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3 sm:p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
        <h4 className="font-medium text-purple-300 mb-1 sm:mb-2 text-xs sm:text-sm">Did You Know?</h4>
        <p className="text-xs sm:text-sm text-gray-300">
          Research from the Journal of Neurophysiology shows that optimizing your environment for specific brainwave
          states can improve cognitive performance by up to 37%.
        </p>
      </div>
    </div>
  )
}
