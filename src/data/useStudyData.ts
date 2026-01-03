import { useState } from "react";

export type MATERIAL = {
  id: number;
  name: string;
  uploadDate: string;
  summary: string;
};

export function useStudyData() {
  const [materials, setMaterials] = useState<MATERIAL[]>([]);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  return {
    materials,
    setMaterials,
    flashcards,
    setFlashcards,
    quizzes,
    setQuizzes,
  };
}
