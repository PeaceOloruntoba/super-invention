import { BookOpen, Brain, Trophy } from "lucide-react";
import { useStudyData } from "../data/useStudyData.tsx";
import { toast } from "sonner";

export default function Materials() {
  const { materials, setFlashcards, setQuizzes } = useStudyData();

  const generateFlashcards = (materialId: number) => {
    const material = materials.find((m) => m.id === materialId);
    if (!material) return;
    const deck = {
      id: Date.now(),
      materialId: material.id,
      materialName: material.name,
      cards: [
        { question: "What are the key ideas?", answer: "Summaries, key concepts, and exam tips." },
        { question: "Name a concept from the summary.", answer: material.summary.split(" ").slice(0, 6).join(" ") + "..." },
      ],
    };
    setFlashcards((prev) => [...prev, deck]);
    toast.success("🎴 Flashcards generated (dummy)");
  };

  const generateQuiz = (materialId: number) => {
    const material = materials.find((m) => m.id === materialId);
    if (!material) return;
    const quiz = {
      id: Date.now(),
      materialId: material.id,
      materialName: material.name,
      questions: [
        {
          question: "This dummy quiz question #1?",
          options: ["A", "B", "C", "D"],
          correct: 1,
          explanation: "Explanation for question 1",
        },
        {
          question: "This dummy quiz question #2?",
          options: ["True", "False", "Maybe", "N/A"],
          correct: 0,
          explanation: "Explanation for question 2",
        },
      ],
    };
    setQuizzes((prev) => [...prev, quiz]);
    toast.success("📝 Quiz generated (dummy)");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Study Materials</h2>
      {materials.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No materials uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {materials.map((material) => (
            <div key={material.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-indigo-600">{material.name}</h3>
                  <p className="text-sm text-gray-500">Uploaded: {new Date(material.uploadDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => generateFlashcards(material.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 text-sm"
                  >
                    <Brain className="w-4 h-4 inline mr-1" /> Flashcards
                  </button>
                  <button
                    onClick={() => generateQuiz(material.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 text-sm"
                  >
                    <Trophy className="w-4 h-4 inline mr-1" /> Quiz
                  </button>
                </div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Summary:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{material.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
