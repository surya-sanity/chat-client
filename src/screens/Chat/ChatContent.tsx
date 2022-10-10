import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { getChats, getTyping } from "../../store/reducers/chatReducer";
import { getCurrentUser } from "../../store/reducers/userReducer";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import TypingMessage from "./TypingMessage";

interface Props {
  scrollRef: any,
  triggerScroll: boolean
  userId: string
}

const ChatContent = (props: Props) => {
  const { scrollRef, triggerScroll, userId } = props;
  const chats = useAppSelector(getChats)
  const typing = useAppSelector(getTyping)
  const currentUser = useAppSelector(getCurrentUser)

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [triggerScroll, chats])

  useEffect(() => {
    if (typing.fromUserId === userId && typing.typing) {
      scrollRef.current?.scrollIntoView();
    }
  }, [typing])

  return (
    <div className="flex flex-1 overflow-auto flex-col px-4 py-2 h-32 scrollbar-thin scrollbar-thumb-sentBgColor scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden">
      {
        chats.map((item, index) => {
          if (
            item?.fromUserId === currentUser.id &&
            item?.toUserId === userId
          ) {

            return <SentMessage key={index} chat={item} />
          }
          if (
            item?.fromUserId === userId &&
            item?.toUserId === currentUser?.id
          ) {
            return <ReceivedMessage key={index} chat={item} userId={userId} />
          }
          return null
        })
      }
      {typing.fromUserId === userId && typing.typing && <TypingMessage userId={userId} />}
      <div ref={scrollRef} />
    </div>
  )
}

export default ChatContent;