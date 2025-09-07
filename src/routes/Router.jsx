import Home from "../pages/Home";
import Questions from "../pages/Questions";
import NotFound from "../pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../middleware/ProtectedRoute";
import HomeRedirect from "../middleware/HomeRedirect";
const Router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Home />
      // <HomeRedirect>
      // </HomeRedirect>
     
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
