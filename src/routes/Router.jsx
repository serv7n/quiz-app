import Home from "../pages/Home";
import Questions from "../pages/Questions";
import NotFound from "../pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../middleware/ProtectedRoute";
const Router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <Home />
     
    ),
  },
  {
    path: "/q",
    element: (
      <ProtectedRoute>
        <Questions />
       </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFound /> },
]);

export default Router;
