import { useEffect } from "react";
import Divider from "../../components/Divider";
import OnlineStatus from "../../components/OnlineStatus";
import Skeleton from "../../components/skeleton";
import { useGetUserByIdHook } from "../../hooks/getUserById";
import { useOnlineStatusHook } from "../../hooks/onlineStatusHook";
import { getUserOnlineStatus } from "../../services/chatFunctions";
import { useAppSelector } from "../../store/hooks";
import { getCurrentUser } from "../../store/reducers/userReducer";
import { UserAvatar } from "../Users/UserCard";
interface Props {
  userId: string
}

const ChatBoxHeader = (props: Props) => {
  const { userId } = props;
  const { isOnline } = useOnlineStatusHook(userId ?? "")

  const { user } = useGetUserByIdHook(userId)

  if (!user) {
    return <Skeleton />
  }

  return (
    <div>
      <div className="flex justify-start items-center p-4">
        <div className="relative">
          <UserAvatar userId={userId} className="h-14 w-14" />
          <OnlineStatus className="border-white border-2 rounded-full p-1 absolute bottom-2 right-2" userId={userId} />
        </div>

        <div className="flex flex-col ml-3">
          <div className="text-xl font-semibold">{user.firstName} {user.lastName}</div>
          <div className="text-xs font-normal">{isOnline ? "online" : "away"}</div>
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default ChatBoxHeader;