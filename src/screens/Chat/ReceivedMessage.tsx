import { motion } from 'framer-motion'
import { ChatMessage } from '../../models/wsMessage';

interface Props {
  chat: ChatMessage
}

const ReceivedMessage = (props: Props) => {
  const { chat } = props;

  return (
    <div className="self-start max-w-lg break-all">
      <div
        className=" flex items-end my-1 left-0 break-all">
        <img className="rounded-full h-9 w-9 bg-secondary relative" src="https://surya-dev.vercel.app/surya.jpeg" />
        <div
          className="bg-secondary rounded-[20px] p-3 ml-2">
          <div className="text-dark break-all">{chat.text}</div>
        </div>
      </div>
    </div>
  )
}
export default ReceivedMessage;