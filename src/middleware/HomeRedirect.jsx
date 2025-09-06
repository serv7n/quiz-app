// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("user");

  if (isLoggedIn) {
    console.log(isLoggedIn)
    return <Navigate to="/q" replace />; // redireciona para a página de login
  }

  return children;
}
