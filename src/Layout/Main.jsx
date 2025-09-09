import { Navbar } from "@/Pages/Shared/Navbar";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
