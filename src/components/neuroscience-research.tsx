"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Clock,
  Lightbulb,
  BookOpen,
  Smile,
  Sparkles,
  FileText,
  Calendar,
  GraduationCap,
  ArrowRight,
} from "lucide-react"

export function NeuroscienceResearch() {
  const [activeTab, setActiveTab] = useState("overview")

  const strategies = [
    {
      id: "personal-connection",
      title: "Personal Connection to Material",
      icon: <BookOpen className="h-6 w-6 text-purple-400" />,
      description: "Actively relate new information to your personal experiences, goals, or existing knowledge.",
      research:
        "UC Berkeley emphasizes personalized learning to enhance cognitive engagement and retention. Connecting new knowledge to personal contexts deeply integrates it into existing mental frameworks.",
      appIntegration:
        "Use reflective note-taking or journaling tools within the app to document personal connections and reinforce comprehension.",
    },
    {
      id: "pomodoro",
      title: "Structured Study Sessions (Pomodoro)",
      icon: <Clock className="h-6 w-6 text-indigo-400" />,
      description:
        "Break tasks into structured intervals—typically 25 minutes of focused work followed by a 5-minute break.",
      research:
        "Berkeley's Graduate Student Instructor Teaching & Resource Center endorses this technique, noting its effectiveness in maintaining concentration and preventing cognitive burnout.",
      appIntegration:
        "Integrated timers and automated break reminders facilitate effective implementation of the Pomodoro Technique.",
    },
    {
      id: "mood",
      title: "Positive Mood and Stress Management",
      icon: <Smile className="h-6 w-6 text-pink-400" />,
      description: "Promote emotional well-being through sufficient sleep, relaxation, and stress management.",
      research:
        "UC Berkeley research highlights that managing stress is crucial to maintaining optimal cognitive function and preventing detrimental brain changes associated with chronic stress.",
      appIntegration:
        "Access guided meditation, breathing exercises, and relaxation prompts to manage stress, enhance mood, and foster optimal cognitive performance.",
    },
    {
      id: "mindfulness",
      title: "Mindfulness Practices",
      icon: <Sparkles className="h-6 w-6 text-blue-400" />,
      description:
        "Incorporate brief, regular mindfulness exercises to enhance attention span and reduce distractibility.",
      research:
        "Berkeley's Greater Good Science Center underscores mindfulness as a powerful tool for clearing mental clutter and promoting sustained cognitive focus.",
      appIntegration:
        "Utilize guided mindfulness sessions and regular reminders to engage in mindfulness activities within the app.",
    },
    {
      id: "metacognitive",
      title: "Metacognitive Strategies",
      icon: <Brain className="h-6 w-6 text-teal-400" />,
      description: "Develop awareness of your thinking processes to improve learning effectiveness.",
      research:
        "Techniques like concept mapping, reflective journaling, and self-assessment actively foster deeper engagement and enhanced understanding. Berkeley's teaching resources emphasize metacognition's role in effective learning.",
      appIntegration:
        "Digital tools for concept mapping and reflective exercises facilitate metacognitive practices and critical self-awareness.",
    },
    {
      id: "practice",
      title: "Low-Stakes Practice Assessments",
      icon: <FileText className="h-6 w-6 text-amber-400" />,
      description:
        "Regular participation in low-pressure practice tests or quizzes strengthens memory and consolidates learning.",
      research:
        "Berkeley's research affirms retrieval practice through active recall as significantly more effective than passive review.",
      appIntegration:
        "Customizable quizzes and assessments support active recall and identification of knowledge gaps.",
    },
    {
      id: "time-management",
      title: "Effective Time Management",
      icon: <Calendar className="h-6 w-6 text-red-400" />,
      description:
        "Strategically plan tasks by setting clear goals, deadlines, and breaking tasks into manageable segments.",
      research:
        "Effective time management, according to Berkeley's Student Learning Center, reduces procrastination and cognitive overload.",
      appIntegration:
        "Scheduling tools, progress trackers, and task reminders enhance organization and workflow efficiency.",
    },
    {
      id: "humility",
      title: "Cultivating Intellectual Humility",
      icon: <GraduationCap className="h-6 w-6 text-violet-400" />,
      description:
        "Embrace a growth mindset by acknowledging the limitations of your current knowledge and learning from mistakes.",
      research:
        "Berkeley's Greater Good Science Center highlights intellectual humility as critical for long-term learning and open-mindedness.",
      appIntegration:
        "Engage with feedback mechanisms and reflective prompts designed to foster intellectual humility and continuous learning.",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          Neuroscience of Focus
        </h1>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 sm:mb-6 text-xs sm:text-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="data-[state=active]:bg-purple-600">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span>Strategies</span>
          </TabsTrigger>
          <TabsTrigger value="brainwaves" className="data-[state=active]:bg-purple-600">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span>Brainwaves</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <Card className="border-purple-500/20 bg-gray-800/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Cognitive Focus Research</CardTitle>
              <CardDescription className="text-gray-300 text-sm">
                A comprehensive guide based on UC Berkeley research
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-200">
                Improving cognitive focus profoundly impacts productivity and personal achievement, enabling us to
                accomplish more in less time. This comprehensive guide, informed by research primarily from UC Berkeley,
                serves as a foundational resource for enhancing concentration, productivity, and overall cognitive
                performance.
              </p>

              <div className="relative mt-6 p-6 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <div className="absolute -top-4 left-4 bg-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                  Research Highlights
                </div>
                <ul className="space-y-3 mt-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      UC Berkeley's studies show structured focus techniques can improve productivity by up to 40%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Mindfulness practices enhance attention span and reduce distractibility by 35%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Metacognitive strategies improve learning effectiveness and retention by 25-30%</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-800/70 rounded-lg p-4 border border-purple-500/10 flex flex-col items-center text-center">
                  <div className="bg-purple-900/40 p-3 rounded-full mb-3">
                    <Brain className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="font-medium mb-1">Cognitive Science</h3>
                  <p className="text-sm text-gray-400">Understanding how the brain processes and maintains focus</p>
                </div>

                <div className="bg-gray-800/70 rounded-lg p-4 border border-purple-500/10 flex flex-col items-center text-center">
                  <div className="bg-indigo-900/40 p-3 rounded-full mb-3">
                    <Lightbulb className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="font-medium mb-1">Evidence-Based</h3>
                  <p className="text-sm text-gray-400">All techniques backed by peer-reviewed research studies</p>
                </div>

                <div className="bg-gray-800/70 rounded-lg p-4 border border-purple-500/10 flex flex-col items-center text-center">
                  <div className="bg-blue-900/40 p-3 rounded-full mb-3">
                    <Sparkles className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="font-medium mb-1">Practical Application</h3>
                  <p className="text-sm text-gray-400">Techniques integrated directly into our application</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.map((strategy) => (
              <Card key={strategy.id} className="border-purple-500/20 bg-gray-800/50 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-900 p-2 rounded-full">{strategy.icon}</div>
                    <CardTitle>{strategy.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-200">{strategy.description}</p>

                  <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="text-sm font-medium text-purple-300 mb-1">Research Basis:</h4>
                    <p className="text-sm text-gray-300">{strategy.research}</p>
                  </div>

                  <div className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/20">
                    <h4 className="text-sm font-medium text-indigo-300 mb-1">App Integration:</h4>
                    <p className="text-sm text-gray-300">{strategy.appIntegration}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brainwaves" className="mt-0">
          <Card className="border-purple-500/20 bg-gray-800/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl">Brainwave Science</CardTitle>
              <CardDescription className="text-gray-300">
                Understanding neural oscillations and their impact on focus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-200">
                  Different brainwave frequencies correspond to different mental states. Our application uses
                  scientifically calibrated sound patterns to help entrain your brain to optimal frequencies for your
                  current task.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                    <h3 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
                      <div className="bg-blue-900/40 p-1.5 rounded-full">
                        <Brain className="h-4 w-4 text-blue-400" />
                      </div>
                      Delta Waves (0.5-4 Hz)
                    </h3>
                    <p className="text-sm text-gray-300">
                      Associated with deep, dreamless sleep and healing. Essential for physical recovery and immune
                      function.
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      <strong>Best for:</strong> Recovery periods, deep relaxation
                    </div>
                  </div>

                  <div className="bg-teal-900/20 rounded-lg p-4 border border-teal-500/20">
                    <h3 className="font-medium text-teal-300 mb-2 flex items-center gap-2">
                      <div className="bg-teal-900/40 p-1.5 rounded-full">
                        <Brain className="h-4 w-4 text-teal-400" />
                      </div>
                      Theta Waves (4-8 Hz)
                    </h3>
                    <p className="text-sm text-gray-300">
                      Present during meditation, daydreaming, and REM sleep. Enhances creativity and emotional
                      processing.
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      <strong>Best for:</strong> Creative work, meditation, visualization
                    </div>
                  </div>

                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                    <h3 className="font-medium text-purple-300 mb-2 flex items-center gap-2">
                      <div className="bg-purple-900/40 p-1.5 rounded-full">
                        <Brain className="h-4 w-4 text-purple-400" />
                      </div>
                      Alpha Waves (8-13 Hz)
                    </h3>
                    <p className="text-sm text-gray-300">
                      The bridge between conscious and subconscious. Optimal for learning, relaxed focus, and flow
                      states.
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      <strong>Best for:</strong> Learning, reading, studying, light focus
                    </div>
                  </div>

                  <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/20">
                    <h3 className="font-medium text-orange-300 mb-2 flex items-center gap-2">
                      <div className="bg-orange-900/40 p-1.5 rounded-full">
                        <Brain className="h-4 w-4 text-orange-400" />
                      </div>
                      Beta Waves (13-30 Hz)
                    </h3>
                    <p className="text-sm text-gray-300">
                      Dominant during active thinking, problem-solving, and focused tasks requiring alertness.
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      <strong>Best for:</strong> Problem-solving, analytical work, active focus
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/20">
                    <h3 className="font-medium text-yellow-300 mb-2 flex items-center gap-2">
                      <div className="bg-yellow-900/40 p-1.5 rounded-full">
                        <Brain className="h-4 w-4 text-yellow-400" />
                      </div>
                      Gamma Waves (30-100 Hz)
                    </h3>
                    <p className="text-sm text-gray-300">
                      Associated with peak concentration, cognitive enhancement, and simultaneous processing of
                      information.
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      <strong>Best for:</strong> Complex tasks, peak performance, high-level processing
                    </div>
                  </div>

                  <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-500/20">
                    <h3 className="font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <div className="bg-gray-700 p-1.5 rounded-full">
                        <Lightbulb className="h-4 w-4 text-gray-400" />
                      </div>
                      Research Findings
                    </h3>
                    <p className="text-sm text-gray-300">
                      Studies show that external rhythmic stimuli can influence neural oscillations through a process
                      called "entrainment."
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      <strong>Application:</strong> Our app uses scientifically calibrated sound patterns to help guide
                      your brain to optimal states
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/20 mt-6">
                  <h4 className="font-medium text-indigo-300 mb-2">Neural Frequency Selection in NeuralFocus</h4>
                  <p className="text-sm text-gray-300">
                    Our application allows you to select different brainwave frequencies to optimize your mental state
                    for different types of tasks. The neural frequency technology uses scientifically calibrated sound
                    waves to entrain your brain to the selected frequency, optimizing your mental state for the task at
                    hand.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
