import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Layout } from "./layout/MainLayout";
import Upload from "./pages/Upload";

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout />}>
        <Route path="" element={<Upload />}/>
        </Route>
      </Routes>
    </Router>
    </>
  );
}
