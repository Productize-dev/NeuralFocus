import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export function NeuralHeader() {
  return (
    <header className="border-b border-purple-500/20 backdrop-blur-md bg-black/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-70"></div>
            <div className="relative bg-gray-900 p-1.5 sm:p-2 rounded-full">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            NeuralFocus
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/neuroscience"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Neuroscience
          </Link>
        </nav>

        {/* Mobile navigation */}
        <nav className="md:hidden">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/neuroscience"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Science
            </Link>
          </div>
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            asChild
          >
            <Link href="/auth/login">Log In</Link>
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            asChild
          >
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile login button */}
        <div className="sm:hidden">
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-3 py-1 text-xs"
          >
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
}
