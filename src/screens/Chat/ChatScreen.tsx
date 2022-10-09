import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import ChatBoxHeader from "./ChatBoxHeader"
import ChatContent from "./ChatContent"
import MessageTypeArea from "./MessageTypeArea"

const ChatScreen = () => {
  const scrollRef = useRef<any>();
  const { id } = useParams()

  const [triggerScroll, setTriggerScroll] = useState<boolean>(false);

  if (!id) {
    return null
  }

  return (
    <div className="flex flex-col flex-1 rounded-[25px]  bg-white overflow-clip">
      <ChatBoxHeader userId={id} />
      <ChatContent scrollRef={scrollRef} triggerScroll={triggerScroll} userId={id} />
      <MessageTypeArea onTyping={() => setTriggerScroll(!triggerScroll)} userId={id} />
    </div>
  )
}

export default ChatScreen