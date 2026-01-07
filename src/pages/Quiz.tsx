import { useState } from "react";
import { Check, Trophy } from "lucide-react";
import { useStudyData } from "../data/useStudyData.tsx";

export default function Quiz() {
  const { quizzes } = useStudyData();
  const current = quizzes[quizzes.length - 1];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!current) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p>No quizzes available yet</p>
      </div>
    );
  }

  const correctCount = submitted
    ? current.questions.filter((q, i) => answers[i] === q.correct).length
    : 0;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Practice Quiz</h2>
      <div className="max-w-3xl mx-auto">
        {current.questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-8 p-6 border border-gray-200 rounded-xl">
            <h3 className="text-lg font-bold mb-4">Question {qIndex + 1}: {q.question}</h3>
            <div className="space-y-3">
              {q.options.map((option, oIndex) => {
                const isChosen = answers[qIndex] === oIndex;
                const isCorrect = q.correct === oIndex;
                const cls = submitted
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : isChosen
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                  : isChosen
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300';
                return (
                  <button
                    key={oIndex}
                    onClick={() => !submitted && setAnswers((prev) => ({ ...prev, [qIndex]: oIndex }))}
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${cls}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isChosen ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                        {isChosen && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            {submitted && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <strong>Explanation:</strong> {q.explanation}
              </div>
            )}
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length !== current.questions.length}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="space-y-3">
            <div className="text-center font-semibold">Score: {correctCount}/{current.questions.length} ({Math.round((correctCount/current.questions.length)*100)}%)</div>
            <button
              onClick={() => { setAnswers({}); setSubmitted(false); }}
              className="w-full py-4 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition-all"
            >
              Reset Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
