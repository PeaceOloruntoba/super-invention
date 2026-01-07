import { useState } from "react";
import { Brain } from "lucide-react";
import { useStudyData } from "../data/useStudyData";

export default function Flashcards() {
  const { flashcards } = useStudyData();
  const [deckId, setDeckId] = useState<number | null>(flashcards[0]?.id ?? null);
  const currentDeck = flashcards.find((d) => d.id === deckId) ?? flashcards[0];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Flashcards</h2>
      {flashcards.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No flashcards generated yet</p>
        </div>
      ) : (
        <div>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg mb-6"
            value={currentDeck?.id}
            onChange={(e) => {
              const id = parseInt(e.target.value, 10);
              setDeckId(id);
              setCurrentIndex(0);
              setShowAnswer(false);
            }}
          >
            {flashcards.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.materialName} ({deck.cards.length} cards)
              </option>
            ))}
          </select>

          {currentDeck && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-4 text-gray-600">
                Card {currentIndex + 1} of {currentDeck.cards.length}
              </div>
              <div
                className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-8 min-h-64 flex items-center justify-center cursor-pointer shadow-xl"
                onClick={() => setShowAnswer((s) => !s)}
              >
                <div className="text-center">
                  {!showAnswer ? (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Question:</h3>
                      <p className="text-xl">{currentDeck.cards[currentIndex].question}</p>
                      <p className="text-sm mt-6 opacity-75">Click to reveal answer</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Answer:</h3>
                      <p className="text-xl">{currentDeck.cards[currentIndex].answer}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setCurrentIndex((i) => Math.max(0, i - 1));
                    setShowAnswer(false);
                  }}
                  disabled={currentIndex === 0}
                  className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 font-semibold"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((i) => Math.min(currentDeck.cards.length - 1, i + 1));
                    setShowAnswer(false);
                  }}
                  disabled={currentIndex === currentDeck.cards.length - 1}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
