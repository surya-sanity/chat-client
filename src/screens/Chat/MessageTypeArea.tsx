import Field from "../../components/Field"
import { AiOutlineSend } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { sendTextMessage, sendTypingStatusMessage } from "../../services/chatFunctions";
import { useTypingStatusHook } from "../../hooks/typingHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageValidationSchema } from "../../utils/validation";
import { toastError } from "../../components/Toast";
import { useEffect } from "react";

interface Props {
  onTyping: Function
  userId: string
}

interface TypeAreaFormModel {
  message: string
}

const MessageTypeArea = (props: Props) => {
  const { onTyping, userId } = props;
  const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm<TypeAreaFormModel>({ resolver: yupResolver(messageValidationSchema) })
  const { setTyping } = useTypingStatusHook({ toUserId: userId })

  useEffect(() => {
    if (errors.message?.message) {
      toastError(errors.message.message)
    }
  }, [errors])


  const onSubmit = (values: any) => {
    if (values.message.trim()) {
      sendTypingStatusMessage({ toUserId: userId, typing: false })
      sendTextMessage({ toUserId: userId, text: values.message })
    }
    reset()
  }

  return (
    <form className=" flex justify-center items-center relative m-3 mt-1" onSubmit={handleSubmit(onSubmit)}>
      <Field
        {...register('message')}
        style={{ padding: 15, paddingRight: 50, borderRadius: 50, backgroundColor: "#F5F7FB", color: "black" }}
        placeholder="Type a message"
        autoFocus={true}
        onChange={(event) => {
          setTyping(true)
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