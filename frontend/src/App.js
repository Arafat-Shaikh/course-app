import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { CoursePage } from "./pages/CoursePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import InstructorsPage from "./pages/InstructorsPage";
import LecturesPage from "./pages/LecturesPage";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/course", element: <CoursePage /> },
  { path: "/course/:id", element: <CourseDetailPage /> },
  { path: "/instructors", element: <InstructorsPage /> },
  { path: "/lectures", element: <LecturesPage /> },
  { path: "/", element: <Home /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
