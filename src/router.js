import { createBrowserRouter } from "react-router-dom";

import Register from './pages/Register'
import Login from './pages/Login'

const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
