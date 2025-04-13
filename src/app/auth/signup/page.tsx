import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "@/components/signup-form";
import { NeuralHeader } from "@/components/neural-header";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up | NeuralFocus",
  description: "Create your NeuralFocus account",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white">
      <NeuralHeader />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex flex-col items-center space-y-2 mb-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-70"></div>
              <div className="relative bg-gray-900 p-3 rounded-full">
                <Sparkles className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Join NeuralFocus
            </h1>
            <p className="text-gray-400 text-center max-w-sm">
              Create your account to unlock personalized focus sessions, track
              your progress, and optimize your cognitive performance.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
            <SignUpForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-gray-400 hover:text-gray-300 underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-gray-300 underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
