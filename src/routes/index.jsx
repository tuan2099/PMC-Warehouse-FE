import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, AuthenticationRoutes, LoginRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
