import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Layout } from "./layout/MainLayout";
import Upload from "./pages/Upload";
import Home from "./pages/Home";
import Materials from "./pages/Materials";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import StudyPlan from "./pages/StudyPlan";
import QA from "./pages/Q&A";
import SemesterPlan from "./pages/SemesterPlan";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="upload" element={<Upload />} />
            <Route path="materials" element={<Materials />} />
            <Route path="flashcards" element={<Flashcards />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="study-plan" element={<StudyPlan />} />
            <Route path="q-a" element={<QA />} />
            <Route path="semester-plan" element={<SemesterPlan />} />
          </Route>
          <Route path="admin" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}
