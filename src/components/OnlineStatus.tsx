
import { useOnlineStatusHook } from "../hooks/onlineStatusHook";

interface Props {
  userId: string
  size?: number
  className?: string
}

const OnlineStatus = ({ userId, size, className }: Props) => {
  const { isOnline } = useOnlineStatusHook(userId ?? "")

  return (
    <div className={`border-white border-2 rounded-full p-1 ${isOnline ? "bg-green-500" : "bg-red-500"}  ${className}`}
      style={{ height: size, width: size }}
    />
  )
}

export default OnlineStatus;