import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { ChatMessage } from "../../models/wsMessage";
import { useAppSelector } from "../../store/hooks";
import { getCurrentUser } from "../../store/reducers/userReducer";
import { UserAvatar } from "../Users/UserCard";

interface Props {
  chat: ChatMessage
}

const SentMessage = (props: Props) => {
  const { chat } = props;

  const currentUser = useAppSelector(getCurrentUser)

  function Status() {
    if (!chat.sent && !chat.seen) {
      return (<div className="flex items-center justify-end gap-1 mt-2">
        <AiOutlineClockCircle size={13} color={'white'} />
        <span className="text-[10px] text-white">Sending</span>
      </div>)

    }
    else if (chat.sent && !chat.seen) {
      return (
        <div className="flex items-center justify-end gap-1 mt-2">
          <TiTick size={13} color={'white'} />
          <span className="text-[10px] text-white">Sent</span>
        </div>
      )
    } else if (chat.sent && chat.seen) {
      return (<div className="flex items-center justify-end gap-1 mt-1 -mb-1">
        <AiOutlineEye size={13} color={'white'} />
        <span className="text-[10px] text-white">Seen</span>
      </div>)
    }

    return null;
  }

  return (
    <div className="self-end max-w-lg break-all">
      <div className="flex items-center justify-end my-1 ">
        <div className="bg-sentBgColor rounded-[20px] p-3 mr-2 flex flex-col items-end">
          <div className={`text-white break-all ${chat.text === "" ? "" : ""}`}>{chat.text}</div>
          <Status />
        </div>
        <UserAvatar userId={currentUser.id} className="rounded-full h-9 w-9 bg-secondary relative" />
      </div>
    </div>
  )
}


export default SentMessage;