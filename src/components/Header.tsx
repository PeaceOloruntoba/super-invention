import { Brain } from "lucide-react";

export default function Header() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <header className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-12 h-12 text-indigo-600" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Smart Study Assistant
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Your AI-powered learning companion
        </p>
      </header>
    </div>
  );
}
