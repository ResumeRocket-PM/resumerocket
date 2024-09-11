import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks.js'; // Update the path as needed
import UserInfoProvider from '../context/UserInfoProvider.jsx';

const PrivateRoute = ({ children }) => {
  const { login, authToken } = useAuth();
  const location = useLocation();

  if (!login) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  // otherwise user is logged in and we'll open the child routes, with the UserInfoProvider
  return (
    <UserInfoProvider>
      {children}
    </UserInfoProvider>
  );
};

export default PrivateRoute;