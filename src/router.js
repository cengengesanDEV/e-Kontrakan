import { createBrowserRouter } from "react-router-dom";
import PrivateElement from "./component/PrivateElement";
import PrivateElementAuth from "./component/PrivateElementAuth";

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
// import Paymentuser from "./pages/users/Paymentuser";
import ProfileUser from "./pages/users/ProfileUser";
import HistoryOwner from "./pages/owner/HistoryOwner";

import DashboardAdmin from "./pages/admin/Dashboardadmin";
import DatauserAdmin from "./pages/admin/Datauser"
import Datacategory from "./pages/admin/Datacategory";
import DataDetailKontrakan from "./pages/admin/Datadetailkontrakan"

const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <Dashboard /> },
  { path: "/register", element: <PrivateElementAuth><Register /></PrivateElementAuth> },
  { path: "/login", element: <PrivateElementAuth><Login /></PrivateElementAuth>},
  { path: "/kontrakan", element: <Kontrakan /> },
  { path: "/kontrakan/detail/:id_kontrakan", element: <KontrakanDetail /> },

  { path: "/historyuser", element: <PrivateElement allowedRoles='customer'><Historyuser /></PrivateElement> },
  { path: "/profileuser", element: <PrivateElement allowedRoles='customer'><ProfileUser /></PrivateElement> },
  // { path: "/payment", element: <PrivateElement allowedRoles='customer'><Paymentuser /></PrivateElement> },
  
  
  { path: "/dashboardowner", element: <PrivateElement allowedRoles='owner'><DashboardOwner /></PrivateElement> },
  { path: "/profileowner", element: <PrivateElement allowedRoles='owner'><ProfileOwner /></PrivateElement> },
  { path: "/kontrakanowner", element: <PrivateElement allowedRoles='owner'><DatakontrakanOwner /></PrivateElement> },
  { path: "/kontrakanlocationowner/:id_kontrakan/:kontrakan_location", element: <PrivateElement allowedRoles='owner'><KontrakanLocationOwner /></PrivateElement> },
  { path: "/kontrakandetailowner/:id_location", element: <PrivateElement allowedRoles='owner'><KontrakanDetailOwner /></PrivateElement> },
  { path: "/kontrakanpemesananOwner", element: <PrivateElement allowedRoles='owner'><KontrakanPemesananOwner /></PrivateElement> },
  { path: "/kontrakanhistoryowner", element: <PrivateElement allowedRoles='owner'><HistoryOwner /></PrivateElement> },



  { path: "/dashboardadmin", element: <PrivateElement allowedRoles='admin'><DashboardAdmin /></PrivateElement> },
  { path: "/datauseradmin", element: <PrivateElement allowedRoles='admin'><DatauserAdmin /></PrivateElement> },
  { path: "/datacategoryadmin/:id_user", element: <PrivateElement allowedRoles='admin'><Datacategory /></PrivateElement> },
  { path: "/datadetailkontrakan/:id_location", element: <PrivateElement allowedRoles='admin'><DataDetailKontrakan /></PrivateElement> },

]);

export default router;
