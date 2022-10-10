import { Logo } from "../Assets/svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { getCurrentUser } from "../store/reducers/userReducer";
import { UserAvatar } from "../screens/Users/UserCard";
import { useGetAllUsersQuery, useGetCurrentUserQuery } from "../services/userService";
import { FiUsers } from "react-icons/fi";

const NavHeader = () => {
  useGetCurrentUserQuery()
  useGetAllUsersQuery()
  const currentUser = useAppSelector(getCurrentUser);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!currentUser) {
    return null
  }

  return (
    <section className="flex items-center justify-between mb-2 bg-white rounded-full p-3 px-5">
      <div className="flex items-center">
        <Logo
          className="h-12 w-12 hover:scale-110 transition-all cursor-pointer"
          onClick={() => {
            navigate("/users");
          }}
        />
        <div className="text-2xl ml-3 font-semibold">Flash Chat</div>
      </div>
      <div className="flex flex-row items-center justify-center gap-x-6 ">
        {
          pathname.startsWith("/chat") && <div
            onClick={() => { navigate("/users") }}
            className="flex gap-x-2 p-3 cursor-pointer rounded-full shadow-lg "><FiUsers size={20} /></div>
        }
        <div className="cursor-pointer" onClick={() => navigate("/profile")}>
          <UserAvatar
            userId={currentUser.id}
            className="w-12 h-12 shadow-sm "
          />
        </div>
      </div>
    </section>
  );
};

export default NavHeader;
