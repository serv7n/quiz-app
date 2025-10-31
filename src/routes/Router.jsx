import Home from "../pages/Home";
import QuestionsPage from "../pages/QuestionsPage";
import NotFound from "../pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../middleware/ProtectedRoute";
import HomeRedirect from "../middleware/HomeRedirect";
import Resultados from "../pages/Resultados";
import Tabela from "../pages/Tabela";
import Api from "../pages/ApiTest"
import Turmas from '../pages/Turmas'
import TurmasRedirect from '../middleware/TurmasRedirect';
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
      // <TurmasRedirect>
        <QuestionsPage />
      // </TurmasRedirect>

    ),
    
  },
    {
    path: "/resultados",
    element: (
    
        <Resultados />
    
    ),
    
  },
   {
    path: "/tabela",
    element: (
  
        <Tabela />
    
    ),
    
  },
  { path: "*", element: <NotFound /> },
  {
    path: "/api",
    element: (
        <Api />
    ),
    
  }, {
    path: "/turmas",
    element: (
      <ProtectedRoute>
        <Turmas />
      </ProtectedRoute>
    ),

  },

]);

export default Router;
