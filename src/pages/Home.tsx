import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl font-bold">
          Welcome to Smart Study Assistant
        </span>
        <span>
          Upload your study materials and let our AI generate summaries,
          flashcards, and more to help you prepare for exams.
        </span>
      </div>
    </div>
  );
}
