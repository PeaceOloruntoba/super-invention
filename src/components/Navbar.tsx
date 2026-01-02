import { BookOpen, Brain, Calendar, Clock, MessageSquare, Trophy, Upload } from "lucide-react";

export default function Navbar() {
  const navItem = [
    { id: "upload", icon: Upload, label: "Upload" },
    {
      id: "materials",
      icon: BookOpen,
      label: "Materials",
      badge: materials.length,
    },
    {
      id: "flashcards",
      icon: Brain,
      label: "Flashcards",
      badge: flashcards.length,
    },
    { id: "quiz", icon: Trophy, label: "Quiz", badge: quizzes.length },
    { id: "plan", icon: Calendar, label: "Study Plan" },
    { id: "semester", icon: Clock, label: "Semester Plan" },
    { id: "chat", icon: MessageSquare, label: "Q&A" },
  ];

  return (
    <div>
      <nav className="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-2 shadow-lg">
        {navItem.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
            {tab.badge > 0 && (
              <span className="bg-white text-indigo-600 text-xs px-2 py-1 rounded-full font-bold">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
