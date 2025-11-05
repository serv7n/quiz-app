import AdminLogin from "../pages/AdminLogin";
import Admin from "../pages/Admin";
import TurmaDetalhes from "../pages/TurmaDetalhes";
import NotFound from "../pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import Editar from "../pages/Editar";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/turma/:id",
    element: <TurmaDetalhes />,
  },
  {
    path: "/turma/:id/editar",
    element: <Editar/>,
  },
  { path: "*", element: <NotFound /> },
]);

export default Router;
