import { Ref, useEffect, useRef } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";

interface Props {
  scrollRef: any,
  triggerScroll: boolean
  userId: string
}

const ChatContent = (props: Props) => {
  const { scrollRef, triggerScroll, userId } = props;

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [triggerScroll])

  return (
    <div className="overflow-auto flex flex-1 flex-col justify-end px-4 h-32 scrollbar-thin scrollbar-thumb-sentBgColor scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden">
      <div className="flex justify-start "><ReceivedMessage /></div>
      <div className="flex justify-end "><SentMessage /></div>
      <div className="flex justify-start "><ReceivedMessage /></div>
      <div className="flex justify-end "><SentMessage /></div>
      <div className="flex justify-start "><ReceivedMessage /></div>
      <div ref={scrollRef} />
    </div>
  )
}

export default ChatContent;