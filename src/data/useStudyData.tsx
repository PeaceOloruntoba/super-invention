import { createContext, useContext, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  dummyFlashcards,
  dummyMaterials,
  dummyPlan,
  dummyQuiz,
  dummySemesterPlan,
  dummyThread,
} from "./dummy";

export type MATERIAL = {
  id: number;
  name: string;
  uploadDate: string;
  summary: string;
};

export type FlashcardDeck = {
  id: number;
  materialId: number;
  materialName: string;
  cards: { question: string; answer: string }[];
};

export type Quiz = {
  id: number;
  materialId: number;
  materialName: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
};

export type StudyPlan = {
  days: {
    day: number;
    date: string;
    tasks: string[];
    duration: string;
    focus: string;
  }[];
};

export type SemesterPlan = {
  totalDays: number;
  schedule: {
    day: number;
    date: string;
    sessions: {
      course: string;
      topics: string[];
      duration: string;
      timeSlot: string;
      type: string;
    }[];
    totalHours: string;
    notes: string;
  }[];
  summary: {
    totalStudyHours: number;
    coursesBreakdown: { course: string; hours: number }[];
  };
};

type ChatMessage = { role: "user" | "assistant"; content: string };

type StudyDataContextType = {
  materials: MATERIAL[];
  setMaterials: Dispatch<SetStateAction<MATERIAL[]>>;
  flashcards: FlashcardDeck[];
  setFlashcards: Dispatch<SetStateAction<FlashcardDeck[]>>;
  quizzes: Quiz[];
  setQuizzes: Dispatch<SetStateAction<Quiz[]>>;
  studyPlan: StudyPlan | null;
  setStudyPlan: Dispatch<SetStateAction<StudyPlan | null>>;
  semesterPlan: SemesterPlan | null;
  setSemesterPlan: Dispatch<SetStateAction<SemesterPlan | null>>;
  chat: ChatMessage[];
  setChat: Dispatch<SetStateAction<ChatMessage[]>>;
};

const StudyDataContext = createContext<StudyDataContextType | undefined>(
  undefined
);

export function StudyDataProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<MATERIAL[]>(dummyMaterials);
  const [flashcards, setFlashcards] =
    useState<FlashcardDeck[]>(dummyFlashcards);
  const [quizzes, setQuizzes] = useState<Quiz[]>(dummyQuiz);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(dummyPlan);
  const [semesterPlan, setSemesterPlan] = useState<SemesterPlan | null>(
    dummySemesterPlan
  );
  const [chat, setChat] = useState<ChatMessage[]>([...dummyThread]);

  const value = useMemo(
    () => ({
      materials,
      setMaterials,
      flashcards,
      setFlashcards,
      quizzes,
      setQuizzes,
      studyPlan,
      setStudyPlan,
      semesterPlan,
      setSemesterPlan,
      chat,
      setChat,
    }),
    [materials, flashcards, quizzes, studyPlan, semesterPlan, chat]
  );

  return (
    <StudyDataContext.Provider value={value}>
      {children}
    </StudyDataContext.Provider>
  );
}

export function useStudyData() {
  const ctx = useContext(StudyDataContext);
  if (!ctx)
    throw new Error("useStudyData must be used within StudyDataProvider");
  return ctx;
}
