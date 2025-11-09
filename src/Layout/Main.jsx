import Footer from "@/Pages/Shared/Footer";
import { Navbar } from "@/Pages/Shared/Navbar";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <div>
      <Navbar />

      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
