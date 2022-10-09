import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";
import { motion } from 'framer-motion'

const SentMessage = () => {
  return (
    <motion.div className="flex items-end max-w-xl my-1 self-auto"
      animate={{ opacity: [0, 1], scale: [0, 1], translateX: [1000, 0], translateY: [500, 0] }}
      transition={{ duration: 0.2, delay: 0.1, staggerChildren: 1 }}
    >
      <div className="bg-sentBgColor rounded-[20px] p-3 mr-2 flex flex-col items-end">
        <div className="text-white">Hello ??</div>
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
    </motion.div>
  )
}
export default SentMessage;