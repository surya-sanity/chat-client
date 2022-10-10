import { useEffect, useRef } from 'react';
import Skeleton from '../../components/skeleton';
import { useGetUserByIdHook } from '../../hooks/getUserById';
import { useOnScreen } from '../../hooks/tabFocusHook';
import { ChatMessage } from '../../models/wsMessage';
import { updateSeenStatusMessage } from '../../services/chatFunctions';
import { UserAvatar } from '../Users/UserCard';

interface Props {
  chat: ChatMessage
  userId: string
}

const ReceivedMessage = (props: Props) => {
  const { chat, userId } = props;
  const ref = useRef<any>(null)
  const isVisible = useOnScreen(ref)

  const { user } = useGetUserByIdHook(userId)


  useEffect(() => {
    if (!chat.seen && isVisible) {
      updateSeenStatusMessage({ messageId: chat.messageId, toUserId: chat.fromUserId })
    }
  }, [chat, isVisible])

  if (!user) {
    return <Skeleton />
  }

  return (
    <div className="self-start max-w-lg break-all" ref={ref}>
      <div
        className=" flex items-center justify-start my-1 left-0 break-all">
        <UserAvatar userId={userId} className="rounded-full h-9 w-9 bg-secondary relative" />
        <div
          className="bg-secondary rounded-[20px] p-3 ml-2">
          <div className="text-dark break-all">{chat.text}</div>
        </div>
      </div>
    </div>
  )
}
export default ReceivedMessage;