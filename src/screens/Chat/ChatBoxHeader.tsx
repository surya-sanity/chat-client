import Divider from "../../components/Divider";

interface Props {
  userId: string
}

const ChatBoxHeader = (props: Props) => {
  const { userId } = props;

  return (
    <div>
      <div className="flex justify-start items-center p-4">
        <div className="relative">
          <img className="rounded-full h-14 w-14 bg-secondary relative" src="https://surya-dev.vercel.app/surya.jpeg" />
          <div className="border-white border-2 rounded-full p-1 bg-red-500 absolute bottom-1 right-1" />
        </div>

        <div className="flex flex-col ml-3">
          <div className="text-xl font-semibold">Surya</div>
          <div className="text-xs font-normal">away</div>
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default ChatBoxHeader;