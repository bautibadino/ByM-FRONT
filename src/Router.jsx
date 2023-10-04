import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import HomeTwo from "./pages/homeTwo";
import Statistics from "./pages/statistics";
import Analytics from "./pages/analytics";
import Clientes from "./pages/clientes";
import MyWallet from "./pages/myWallet";
import Inbox from "./pages/inbox";
import Integrations from "./pages/Integrations";
import Users from "./pages/users";
import Calender from "./pages/calender";
import History from "./pages/history";
import Support from "./pages/supportTicket";
import Settings from "./pages/settings";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ComingSoon from "./pages/commingSoon";
import Error from "./pages/error";
import { ClientProfile } from "./component/listTab/clientProfile";
import Transaction from "./pages/transactions/Transaction";
import Services from "./pages/carServices/Services";
import { CreateService } from "./pages/carServices/CreateService";
import SearchService from "./pages/carServices/SearchService";
import { Cheques } from "./pages/checks/Cheques";
import { SearchCheque } from "./pages/checks/SearchCheque";
import { CreateCheque } from "./pages/checks/CreateCheque";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/clientes",
    element: <Clientes />,
  },
  {
    path: "/clientes/:id",
    element: <ClientProfile/>,
  },
  {
    path: "/transacciones",
    element: <Transaction/>,
  },
  {
    path: "/services/nuevo-service",
    element: 
      <Services>
        <CreateService/>
      </Services>
  },
  {
    path: "/services/consulta",
    element: 
      <Services>
        <SearchService/>
      </Services>
  },
  {
    path: "/cheques",
    element: <Cheques/>,
  },
  {
    path: "/cheques/nuevo-cheque",
    element: 
      <Cheques>
        <CreateCheque/>
      </Cheques>
  },
  {
    path: "/cheques/consulta",
    element: 
      <Cheques>
        <SearchCheque/>
      </Cheques>
  },
  


  {
    path: "/home-2",
    element: <HomeTwo />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },

  {
    path: "/my-wallet",
    element: <MyWallet />,
  },
  {
    path: "/messages",
    element: <Inbox />,
  },
  {
    path: "/integrations",
    element: <Integrations />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/calender",
    element: <Calender />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/support-ticket",
    element: <Support />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
  {
    path: "/404",
    element: <Error />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
