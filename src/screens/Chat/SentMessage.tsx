import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";
import { motion } from 'framer-motion'
import { ChatMessage } from "../../models/wsMessage";

interface Props {
  chat: ChatMessage
}

const SentMessage = (props: Props) => {
  const { chat } = props;

  return (
    <div className="self-end max-w-lg break-all">
      <div className="flex items-end justify-end my-1 ">
        <div className="bg-sentBgColor rounded-[20px] p-3 mr-2 flex flex-col items-end">
          <div className="text-white break-all">{chat.text}</div>
          {/* <div className="flex items-center justify-end gap-1 mt-2">
          <AiOutlineClockCircle size={13} color={'white'} />
          <span className="text-[10px] text-white">Sending</span>
        </div> */}
          <div className="flex items-center justify-end gap-1 mt-1 -mb-1">
            <AiOutlineEye size={13} color={'white'} />
            <span className="text-[10px] text-white">Seen</span>
          </div>
        </div>
        <img className="rounded-full h-9 w-9 bg-secondary relative" src="https://surya-dev.vercel.app/surya.jpeg" />
      </div>
    </div>
  )
}
export default SentMessage;