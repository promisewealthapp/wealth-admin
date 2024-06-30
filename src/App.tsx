import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import MainLayout from "./layouts/MainLayout";
import RootLayout from "./layouts/RootLayout";
import PrivateLayout from "./layouts/PrivateLayout";
const App = () => {
  return (
    <RootLayout>
      <PrivateLayout>
        <Navbar />
        <MainLayout>
          <Outlet />
        </MainLayout>
        <ScrollRestoration />
      </PrivateLayout>
    </RootLayout>
  );
};

export default App;
