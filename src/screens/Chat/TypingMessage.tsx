import { motion } from 'framer-motion';

interface Props {
  userId: string
}

const TypingMessage = (props: Props) => {
  const { userId } = props

  return (
    <motion.div
      animate={{ opacity: [0, 1], scale: [0, 1], translateX: [-1000, 0], translateY: [500, 0] }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="self-start flex items-end max-w-xl my-1 left-0">
      <img className="rounded-full h-9 w-9 bg-secondary relative" src="https://surya-dev.vercel.app/surya.jpeg" />
      <motion.div
        className="bg-secondary rounded-[20px] p-3 ml-2">
        <div className="text-dark">Typing...</div>
      </motion.div>
    </motion.div>
  )
}
export default TypingMessage;