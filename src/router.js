import { createBrowserRouter } from "react-router-dom";

import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from "./pages/Dashboard";
import Kontrakan from "./pages/Kontrakan";
import DashboardOwner from "./pages/owner/DashboardOwner";
import ProfileOwner from "./pages/owner/ProfileOwner";
import DatakontrakanOwner from "./pages/owner/DatakontrakanOwner";
import KontrakanLocationOwner from "./pages/owner/KontrakanLocation"
import KontrakanDetailOwner from "./pages/owner/Kontrakandetail"

const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <Dashboard /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/kontrakan", element: <Kontrakan /> },
  
  
  { path: "/dashboardowner", element: <DashboardOwner /> },
  { path: "/profileowner", element: <ProfileOwner /> },
  { path: "/kontrakanowner", element: <DatakontrakanOwner /> },
  { path: "/kontrakanlocationowner/:id_kontrakan", element: <KontrakanLocationOwner /> },
  { path: "/kontrakandetailowner/:id_location", element: <KontrakanDetailOwner /> },
]);

export default router;
