import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AdminRoute = () => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#D4AF37]"></div>
      </div>
    );
  }

  // Check if user exists AND has role 'admin'
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;