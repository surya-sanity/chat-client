import { useEffect, useState } from "react";
import { getUserOnlineStatus } from "../services/chatFunctions";
import { useAppSelector } from "../store/hooks";
import { getOnlineUsers } from "../store/reducers/onlineReducer";
import { getCurrentUser } from "../store/reducers/userReducer";

export const useOnlineStatusHook = (userId: string) => {
  const onlineUsers = useAppSelector(getOnlineUsers);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const currentUser = useAppSelector(getCurrentUser)

  useEffect(() => {
    getUserOnlineStatus({ fromUserId: currentUser.id, userId })
  }, [onlineUsers])

  useEffect(() => {
    if (onlineUsers && onlineUsers.length > 0) {
      const userFound = onlineUsers.find((item) => item.userId === userId);
      if (userFound) {
        setIsOnline(userFound.isOnline);
      } else {
        setIsOnline(false);
      }
    }
  }, [onlineUsers])

  useEffect(() => {
    let interval: NodeJS.Timer;
    onlineUsers.forEach((user) => {
      getUserOnlineStatus({ fromUserId: currentUser.id, userId })
    })
    interval = setInterval(() => {
      onlineUsers.forEach((user) => {
        getUserOnlineStatus({ fromUserId: currentUser.id, userId })
      })
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [onlineUsers])

  return { isOnline }
}