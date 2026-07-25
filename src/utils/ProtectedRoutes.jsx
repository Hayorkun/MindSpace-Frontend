import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoutes() {
  const { user, loading } = useAuth();

   if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-teal-500 rounded-full animate-spin"/>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet/>


}
