import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import ForgotPassword from "../components/auth/ForgotPassword";
import ManageChampions from "../pages/ManageChampions";
import ManageUser from "../pages/ManageUser";
import ManageAdmins from "../pages/ManageAdmins";
import ManageBank from "../pages/ManageBank";
import ManageGroup from "../pages/ManageGroup";
import ManageOrder from "../pages/ManageOrder";
import ManageCrowdfunding from "../pages/ManageCrowdfunding";
import ManageCurrentLocation from "../pages/ManageCurrentLocation";
import ManageFlipping from "../pages/ManageFlipping";
import MakeAdmin from "../pages/MakeAdmin";
import MakeChampion from "../pages/MakeChampion";
import AddCrowdfunding from "../pages/AddCrowdfunding";
import EditCrowdfunding from "../pages/EditCrowdfunding";
import VerificationCode from "../components/auth/VerificationCode";
import SignUpSuccess from "../components/auth/SignUpSuccess";
import RootLayout from "../layouts/RootLayout";
import ForgotVerificationCode from "../components/auth/ForgotVerificationCode";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ManageSupport from "../pages/ManageSupport";
import AddFaq from "../pages/AddFaq";
import ManageLocation from "../pages/ManageLocation";
import ManageAnalytics from "../pages/ManageAnalytics";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import PrivateLayout from "../layouts/PrivateLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <SuperAdminLayout><Dashboard /></SuperAdminLayout>,
      },
      {
        path: "/manage-admins",
        element: (
          <SuperAdminLayout>
            <ManageAdmins />
          </SuperAdminLayout>
        ),
      },
      {
        path: "/make-admin",
        element: (
          <SuperAdminLayout>
            <MakeAdmin />
          </SuperAdminLayout>
        ),
      },
      {
        path: "/manage-champions",
        element: (
          <SuperAdminLayout>
            <ManageChampions />
          </SuperAdminLayout>
        ),
      },
      {
        path: "/make-champion",
        element: (
          <SuperAdminLayout>
            <MakeChampion />
          </SuperAdminLayout>
        ),
      },
      {
        path: "/manage-user",
        element: (
          <SuperAdminLayout>
            <ManageUser />
          </SuperAdminLayout>
        ),
      },
      {
        path: "/manage-crowdfunding",
        element: <PrivateLayout>
          <ManageCrowdfunding />
        </PrivateLayout>,
      },
      {
        path: "/add-crowdfunding",
        element: <PrivateLayout>
          <AddCrowdfunding />
        </PrivateLayout>,
      },
      {
        path: "/edit-crowdfunding/:id",
        element: <PrivateLayout>
          <EditCrowdfunding />
        </PrivateLayout>,
      },
      {
        path: "/manage-current-location",
        element: <PrivateLayout>
          <ManageCurrentLocation />
        </PrivateLayout>,
      },
      {
        path: "/manage-flipping",
        element: <PrivateLayout>
          <ManageFlipping />
        </PrivateLayout>,
      },
      {
        path: "/manage-bank",
        element: (
          <SuperAdminLayout>
            <ManageBank />
          </SuperAdminLayout>
        ),
      },
      {
        path: "/manage-group",
        element: <PrivateLayout>
          <ManageGroup />
        </PrivateLayout>,
      },
      {
        path: "/manage-location",
        element: <PrivateLayout>
          <ManageLocation />
        </PrivateLayout>,
      },
      {
        path: "/manage-order",
        element: (
          <PrivateLayout>
            <ManageOrder />
          </PrivateLayout>
        ),
      },
      {
        path: "/manage-analytics/:id",
        element: <PrivateLayout>
          <ManageAnalytics />
        </PrivateLayout>,
      },
      {
        path: "/manage-support",
        element: <PrivateLayout>
          <ManageSupport />
        </PrivateLayout>,
      },
      {
        path: "/add-faq",
        element: <PrivateLayout>
          <AddFaq />
        </PrivateLayout>,
      },
    ],
  },
  {
    path: "/sign-up",
    element: (
      <RootLayout>
        <SignUp />
      </RootLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up-successful",
    element: (
      <RootLayout>
        <SignUpSuccess />
      </RootLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-in",
    element: (
      <RootLayout>
        <SignIn />
      </RootLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: (
      <RootLayout>
        <ForgotPassword />
      </RootLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password-otp/:email",
    element: (
      <RootLayout>
        <ForgotVerificationCode />
      </RootLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/verification-code",
    element: (
      <RootLayout>
        {/* <PrivateLayout> */}
        <VerificationCode />
        {/* </PrivateLayout> */}
      </RootLayout>
    ),
    errorElement: <ErrorPage />,
  },
]);
