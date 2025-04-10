import { NeuralHeader } from "@/components/neural-header"
import { NeuroscienceResearch } from "@/components/neuroscience-research"

export default function NeurosciencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white">
      <NeuralHeader />
      <div className="container mx-auto px-4 py-8">
        <NeuroscienceResearch />
      </div>
    </div>
  )
}
