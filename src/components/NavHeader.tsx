import { Logo } from "../Assets/svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUser } from "../store/reducers/userReducer";
import { UserAvatar } from "../screens/Users/UserCard";
import { useGetAllUsersQuery, useGetCurrentUserQuery } from "../services/userService";

const NavHeader = () => {
  useGetCurrentUserQuery()
  useGetAllUsersQuery()
  const currentUser = useAppSelector(getCurrentUser);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      <div className="flex flex-row items-center justify-center gap-x-3">
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
