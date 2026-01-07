import type { FlashcardDeck, MATERIAL, Quiz, SemesterPlan, StudyPlan } from "./useStudyData";

export const dummyMaterials: MATERIAL[] = [
  {
    id: 1,
    name: "Intro_to_Algorithms.pdf",
    uploadDate: new Date().toISOString(),
    summary:
      "This material covers algorithmic complexity, Big-O notation, sorting algorithms (merge sort, quicksort), and basic data structures such as arrays, linked lists, and hash tables. Key ideas: divide-and-conquer, recursion, stability of sorts, and trade-offs between time and space.",
  },
  {
    id: 2,
    name: "Linear_Algebra_Notes.pdf",
    uploadDate: new Date().toISOString(),
    summary:
      "Covers vectors, matrices, Gaussian elimination, determinants, eigenvalues/eigenvectors, and applications to systems of linear equations. Emphasizes geometric intuition: span, basis, rank, and orthogonality.",
  },
];

export const dummyFlashcards: FlashcardDeck[] = [
  {
    id: 1001,
    materialId: 1,
    materialName: "Intro_to_Algorithms.pdf",
    cards: [
      { question: "What is Big-O notation used for?", answer: "To describe the upper bound of an algorithm's time or space complexity." },
      { question: "Name a divide-and-conquer sorting algorithm.", answer: "Merge sort or quicksort." },
      { question: "What does a hash table provide on average?", answer: "O(1) expected time for insert, delete, and lookup." },
      { question: "What is the main trade-off with recursion?", answer: "Clarity vs. overhead (stack frames) and potential for higher space usage." },
    ],
  },
];

export const dummyQuiz: Quiz[] = [
  {
    id: 2001,
    materialId: 1,
    materialName: "Intro_to_Algorithms.pdf",
    questions: [
      {
        question: "What is the average time complexity of quicksort?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
        correct: 1,
        explanation: "Average-case quicksort runs in O(n log n), though worst-case is O(n^2).",
      },
      {
        question: "Which data structure offers average O(1) lookups?",
        options: ["Array", "Linked List", "Hash Table", "Binary Tree"],
        correct: 2,
        explanation: "Hash tables provide expected O(1) operations with a good hash function.",
      },
      {
        question: "Merge sort is based on which paradigm?",
        options: ["Greedy", "Dynamic Programming", "Divide and Conquer", "Backtracking"],
        correct: 2,
        explanation: "Merge sort splits, sorts subproblems, and merges results.",
      },
      {
        question: "Which is typically in-place?",
        options: ["Merge sort", "Quicksort", "Counting sort", "Radix sort"],
        correct: 1,
        explanation: "Classic quicksort is in-place whereas merge sort needs extra space.",
      },
      {
        question: "What does Big-O ignore?",
        options: ["Lower-order terms and constants", "Input size", "Worst case", "Algorithmic steps"],
        correct: 0,
        explanation: "Big-O focuses on asymptotic growth, ignoring constants and lower-order terms.",
      },
    ],
  },
];

export const dummyPlan: StudyPlan = {
  days: [
    {
      day: 1,
      date: new Date().toISOString().slice(0, 10),
      tasks: ["Read chapter on Big-O", "Practice 10 sorting questions"],
      duration: "2 hours",
      focus: "Algorithmic complexity",
    },
    {
      day: 2,
      date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      tasks: ["Implement merge sort", "Analyze time complexity"],
      duration: "2.5 hours",
      focus: "Divide-and-conquer",
    },
  ],
};

export const dummySemesterPlan: SemesterPlan = {
  totalDays: 7,
  schedule: Array.from({ length: 7 }).map((_, idx) => ({
    day: idx + 1,
    date: new Date(Date.now() + idx * 86400000).toISOString().slice(0, 10),
    sessions: [
      {
        course: "Algorithms",
        topics: ["Sorting", "Complexity"],
        duration: "1.5 hours",
        timeSlot: "Morning",
        type: "Study",
      },
      {
        course: "Linear Algebra",
        topics: ["Matrices", "Gaussian elimination"],
        duration: "1 hour",
        timeSlot: "Evening",
        type: "Review",
      },
    ],
    totalHours: "2.5 hours",
    notes: "Alternate topics for variety",
  })),
  summary: {
    totalStudyHours: 17,
    coursesBreakdown: [
      { course: "Algorithms", hours: 10 },
      { course: "Linear Algebra", hours: 7 },
    ],
  },
};

export const dummyThread = [
  { role: "assistant", content: "Hi! I'm your study assistant. Ask me anything about your materials." },
  { role: "user", content: "Summarize divide-and-conquer in one sentence." },
  { role: "assistant", content: "Divide-and-conquer splits a problem into subproblems, solves them independently, and combines the results." },
] as const;
