import { ChatMessage, MessageType, TypingMessageType, UpdateSeenMessageType, UserOnlineStatusMessageType } from "../models/wsMessage";
import { store } from "../store";
import { addChats, setTyping, updateChat } from "../store/reducers/chatReducer";
import { OnlineUser, updateOnlineUser } from "../store/reducers/onlineReducer";
import { socket } from "./socket";
import { userApi } from "./userService";

const addSocketListeners = () => {
  const dispatch = store.dispatch;

  socket.addListener(MessageType.TextMessage, (message) => {
    const chat = message.message as ChatMessage;
    dispatch(addChats(chat))
  })
  socket.addListener(MessageType.Typing, (message) => {
    const typingMessage = message.message as TypingMessageType

    dispatch(setTyping({ fromUserId: typingMessage.fromUserId, typing: typingMessage.typing }))
  })
  socket.addListener(MessageType.UpdateSeen, (message) => {
    const seenMessage = message.message as UpdateSeenMessageType
    dispatch(updateChat(seenMessage))
  })
  socket.addListener(MessageType.ProfileUpdate, (message) => {
    dispatch(userApi.util.invalidateTags(['CurrentUser', 'Users']))
  })
  socket.addListener(MessageType.UserOnlineStatus, (message) => {
    const onlineMessage = message.message as UserOnlineStatusMessageType

    const status = {
      isOnline: onlineMessage.isOnline,
      userId: onlineMessage.userId,
    } as OnlineUser

    dispatch(updateOnlineUser(status))
  })
}

export default addSocketListeners;