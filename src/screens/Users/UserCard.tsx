import { NavLink } from "react-router-dom";
import { Avatar1, AvatarsList } from "../../Assets/avatars";
import OnlineStatus from "../../components/OnlineStatus";
import { useOnlineStatusHook } from "../../hooks/onlineStatusHook";
import { User } from "../../models/userModel";
import { useAppSelector } from "../../store/hooks";
import { getAllUsers, getCurrentUser } from "../../store/reducers/userReducer";

interface Props {
  user: User;
}

const UserCard = (props: Props) => {
  const { user } = props;
  const { isOnline } = useOnlineStatusHook(user.id ?? "")


  return (
    <div className="flex bg-white rounded-lg shadow-sm p-5 mr-2 mb-2 hover:bg-secondary transition-all max-w-md ">
      <div className="flex flex-col items-center justify-center flex-1">
        <UserAvatar userId={user.id} />
        <div className="w-24 mb-1 text-xl font-medium text-gray-900 break-words text-ellipsis truncate text-center">
          {`${user?.firstName} ${user?.lastName}`}
        </div>
        <div className="flex flex-row gap-x-2 justify-center items-center">
          <OnlineStatus userId={user.id} />
          <span className="text-sm text-gray-500 ">{isOnline ? "Online" : "Away"}</span>
        </div>
        <div className="flex mt-2 space-x-3">
          <NavLink
            to={`/chat/${user.id}`}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-sentBgColor rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            Message
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

export const UserAvatar = ({
  userId,
  className,
}: {
  userId: string;
  className?: string;
}) => {
  const users = useAppSelector(getAllUsers);
  const currentUser = useAppSelector(getCurrentUser);

  const allUsers = [...users, currentUser];

  const user = allUsers.find((item) => item.id === userId);

  if (!user) {
    return (
      <div
        className={`mb-2  rounded-full shadow-lg object-cover bg-secondary ${className ?? "w-24 h-24"}`}
      >
        <div className="flex flex-1 h-full justify-center items-center text-2xl">
          <div>U</div>
        </div>
      </div>
    );
  }

  const avatar = AvatarsList.find((item) => item.id === user.avatar);

  if (avatar) {
    return (
      <avatar.svg
        className={`mb-2 rounded-full shadow-lg object-cover ${className ?? "w-24 h-24"}`}
        alt="avatar"
      />
    );
  }

  return (
    <div
      className={`mb-2 rounded-full shadow-lg object-cover bg-secondary ${className ?? "w-24 h-24"}`}
    >
      <div className="flex flex-1 h-full justify-center items-center text-2xl">
        <div>{user.firstName.slice(0, 1).toUpperCase()}</div>
      </div>
    </div>
  );
};
