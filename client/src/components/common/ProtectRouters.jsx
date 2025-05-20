import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// This component is used to protect routes that require authentication
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// This component is used to protect routes that should not be accessed by authenticated users
// export const AuthenticatedUser = ({ children }) => {
//   const { isAuthenticated } = useSelector((store) => store.auth);

//   if (isAuthenticated) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// This component is used to protect routes that require admin access
export const InstructorRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "instructor") {
    return <Navigate to="/" />;
  }

  return children;
};

// This component is used to protect routes that require admin access
export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};
