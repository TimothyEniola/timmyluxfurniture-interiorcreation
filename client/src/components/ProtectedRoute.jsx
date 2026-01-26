import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = () => {
  const { user, isCheckingAuth } = useAuthStore();

  // 1. While the app is checking session (backend API call), show loading
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#D4AF37]"></div>
      </div>
    );
  }

  // 2. If check is done and no user found, redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 3. Render the protected page
  return <Outlet />;
};

export default ProtectedRoute;