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
import KontrakanPemesananOwner from "./pages/owner/Datapemesanan"
import KontrakanDetail from "./pages/users/Kontrakandetail"
import Historyuser from "./pages/users/Historyuser";
import Paymentuser from "./pages/users/Paymentuser";
import ProfileUser from "./pages/users/ProfileUser";

import DashboardAdmin from "./pages/admin/Dashboardadmin";
import DatauserAdmin from "./pages/admin/Datauser"
import Datacategory from "./pages/admin/Datacategory";
import DataDetailKontrakan from "./pages/admin/Datadetailkontrakan"

const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <Dashboard /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/kontrakan", element: <Kontrakan /> },
  { path: "/kontrakan/detail/:id_kontrakan", element: <KontrakanDetail /> },
  { path: "/historyuser", element: <Historyuser /> },
  { path: "/profileuser", element: <ProfileUser /> },
  { path: "/payment", element: <Paymentuser /> },
  
  
  { path: "/dashboardowner", element: <DashboardOwner /> },
  { path: "/profileowner", element: <ProfileOwner /> },
  { path: "/kontrakanowner", element: <DatakontrakanOwner /> },
  { path: "/kontrakanlocationowner/:id_kontrakan/:kontrakan_location", element: <KontrakanLocationOwner /> },
  { path: "/kontrakandetailowner/:id_location", element: <KontrakanDetailOwner /> },
  { path: "/kontrakanpemesananOwner", element: <KontrakanPemesananOwner /> },



  { path: "/dashboardadmin", element: <DashboardAdmin /> },
  { path: "/datauseradmin", element: <DatauserAdmin /> },
  { path: "/datacategoryadmin/:id_user", element: <Datacategory /> },
  { path: "/datadetailkontrakan/:id_location", element: <DataDetailKontrakan /> },

]);

export default router;
