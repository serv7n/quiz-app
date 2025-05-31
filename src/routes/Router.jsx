import Home from '../pages/Home'
import Questions from '../pages/Questions'
import NotFound from '../pages/NotFound'
import { createBrowserRouter } from 'react-router-dom'

const Router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/q", element: <Questions /> },
  { path: "*", element: <NotFound /> }
])

export default Router