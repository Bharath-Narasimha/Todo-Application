import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  const token = Cookie.get('jwt_token');
  
  // If no token is found, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the passed-in element
  return element;
};

export default ProtectedRoute;
