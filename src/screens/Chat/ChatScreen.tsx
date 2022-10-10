import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetChatsByUserIdQuery } from "../../services/chatService";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatContent from "./ChatContent";
import MessageTypeArea from "./MessageTypeArea";

const ChatScreen = () => {
  const scrollRef = useRef<any>();
  const { id } = useParams();

  const [triggerScroll, setTriggerScroll] = useState<boolean>(false);
  const { data, isLoading, isSuccess, isError } = useGetChatsByUserIdQuery(id ?? "", { skip: !id })

  if (!id) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 rounded-[25px]  bg-white overflow-clip max-w-[90rem] mx-auto">
      <ChatBoxHeader userId={id} />
      <ChatContent
        scrollRef={scrollRef}
        triggerScroll={triggerScroll}
        userId={id}
      />
      <MessageTypeArea
        onTyping={() => setTriggerScroll(!triggerScroll)}
        userId={id}
      />
    </div>
  );
};

export default ChatScreen;
