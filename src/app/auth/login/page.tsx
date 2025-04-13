import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { NeuralHeader } from "@/components/neural-header";
import { Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Login | NeuralFocus",
  description: "Login to your NeuralFocus account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white">
      <NeuralHeader />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex flex-col items-center space-y-2 mb-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-70"></div>
              <div className="relative bg-gray-900 p-3 rounded-full">
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-center max-w-sm">
              Sign in to your NeuralFocus account to access your personalized
              focus sessions and track your progress.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
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
