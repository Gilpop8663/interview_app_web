import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '@/pages/NotFoundPage';
import AdminRoute from './AdminRoute';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import ResetPasswordRedirectPage from '@/pages/ResetPasswordRedirectPage';

interface RouterBase {
  path: string;
  element: React.ReactNode;
  withAuth: boolean;
  isOrigin?: boolean;
  isAdmin?: boolean;
}

const routerData: RouterBase[] = [
  {
    path: '/',
    element: <NotFoundPage />,
    withAuth: false,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
    withAuth: false,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPasswordPage />,
    withAuth: false,
  },
];

const formattedRouter = routerData.map((route) => {
  if (route.isOrigin) {
    return {
      path: route.path,
      element: route.element,
    };
  }

  if (route.isAdmin) {
    return {
      path: route.path,
      element: <AdminRoute>{route.element}</AdminRoute>,
    };
  }

  if (route.withAuth) {
    return {
      path: route.path,
      element: <PrivateRoute>{route.element}</PrivateRoute>,
    };
  }

  return {
    path: route.path,
    element: route.element,
  };
});

export const router = createBrowserRouter(formattedRouter);
