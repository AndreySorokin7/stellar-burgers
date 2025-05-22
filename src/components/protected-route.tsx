import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  element: JSX.Element;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  element
}) => {
  const { user, isAuthChecked } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Можно добавить лоадер
    return null;
  }

  if (onlyUnAuth && user) {
    // Если пользователь уже авторизован, не пускать на /login, /register и т.д.
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    // Если пользователь не авторизован, не пускать на приватные страницы
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};
