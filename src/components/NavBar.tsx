import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSignOutHook } from "../hooks/signOutHook";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUser } from "../store/reducers/userReducer";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const { signOut } = useSignOutHook();

  const currentUser = useAppSelector(getCurrentUser)

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="h-screen flex flex-col p-4 xl:p-7 lg-p-7 max-w-7xl mx-auto overflow-hidden">
      <section className="flex justify-between mb-5">
        <div className="text-2xl">Chat App</div>
        <div className="text-red-500" onClick={signOut}>LOGOUT</div>
      </section>
      <section className="h-full flex flex-1  overflow-hidden">
        <Outlet />
      </section>
    </div>
  );
}
