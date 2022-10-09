import Field from "../../components/Field"
import { AiOutlineSend } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { sendTextMessage } from "../../services/chatFunctions";
import { useTypingStatusHook } from "../../hooks/typingHook";

interface Props {
  onTyping: Function
  userId: string
}

const MessageTypeArea = (props: Props) => {
  const { onTyping, userId } = props;
  const { register, reset, handleSubmit, setValue } = useForm()
  const { onKeyDownNotEnter } = useTypingStatusHook({ toUserId: userId })

  const onSubmit = (values: any) => {
    sendTextMessage({ toUserId: userId, text: values.message })
    reset()
  }

  return (
    <form className=" flex justify-center items-center relative m-3 mt-1" onSubmit={handleSubmit(onSubmit)}>
      <Field
        {...register('message')}
        style={{ padding: 15, paddingRight: 50, borderRadius: 50, backgroundColor: "#F5F7FB", color: "black" }}
        placeholder="Type a message"
        onChange={(event) => {
          onKeyDownNotEnter()
          onTyping();
          setValue("message", event.target.value);
        }}
      />
      <div className="absolute right-0 bg-opacity-50 rounded-full p-1 mx-2 flex justify-center items-center">
        <AiOutlineSend size={24} />
      </div>
    </form>
  )
}

export default MessageTypeArea