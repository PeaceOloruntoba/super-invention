import {
  BookOpen,
  Brain,
  Calendar,
  Clock,
  MessageSquare,
  Trophy,
  Upload,
} from "lucide-react";
import { NavLink } from "react-router";
import { useStudyData } from "../data/useStudyData";

export default function Navbar() {
  const { materials, flashcards, quizzes } = useStudyData();

  const navItem = [
    { id: "upload", link: "", icon: Upload, label: "Upload" },
    {
      id: "materials",
      link: "materials",
      icon: BookOpen,
      label: "Materials",
      badge: materials?.length,
    },
    {
      id: "flashcards",
      link: "flashcards",
      icon: Brain,
      label: "Flashcards",
      badge: flashcards.length,
    },
    {
      id: "quiz",
      link: "quiz",
      icon: Trophy,
      label: "Quiz",
      badge: quizzes.length,
    },
    { id: "plan", link: "plan", icon: Calendar, label: "Study Plan" },
    { id: "semester", link: "semester", icon: Clock, label: "Semester Plan" },
    { id: "chat", link: "chat", icon: MessageSquare, label: "Q&A" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <nav className="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-lg">
        {navItem.map((tab) => (
          <NavLink
            to={tab.link}
            key={tab.id}
            className={({ isActive }) =>
              `
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `
            }
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
            {typeof tab.badge === "number" && tab.badge > 0 && (
              <span className="bg-white text-indigo-600 text-xs px-2 py-1 rounded-full font-bold">
                {tab.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
