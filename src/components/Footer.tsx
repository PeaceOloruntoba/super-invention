import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 text-center text-gray-600">
      <p className="flex items-center justify-center gap-2">
        <Zap className="w-5 h-5 text-indigo-600" />
        Powered by Claude AI - Built for smarter studying
      </p>
    </footer>
  );
}
