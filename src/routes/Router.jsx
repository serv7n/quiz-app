import Home from "../pages/Home";
import Questions from "../pages/Questions";
import NotFound from "../pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../middleware/ProtectedRoute";
import HomeRedirect from "../middleware/HomeRedirect";
import Resultados from "../pages/Resultados";
import Tabela from "../pages/Tabela";
const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomeRedirect>
        <Home />
      </HomeRedirect>
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
    {
    path: "/resultados",
    element: (
      <ProtectedRoute>
        <Resultados />
      </ProtectedRoute>
    ),
    
  },
   {
    path: "/tabela",
    element: (
      <ProtectedRoute>
        <Tabela />
      </ProtectedRoute>
    ),
    
  },
  { path: "*", element: <NotFound /> },
]);

export default Router;
