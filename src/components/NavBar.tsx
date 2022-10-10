import { Outlet } from "react-router-dom";
import NavHeader from "./NavHeader";

export default function NavBar() {
  return (
    <div className="h-screen flex flex-col p-4 xl:p-7 lg-p-7 max-w-[90rem] mx-auto overflow-hidden">
      <NavHeader />
      <section className="h-full flex flex-1  overflow-hidden">
        <Outlet />
      </section>
    </div>
  );
}
