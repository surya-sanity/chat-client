import { TypingMessageType } from './../models/wsMessage';
import { Message, MessageType, TextMessageType } from "../models/wsMessage"
import { store } from "../store"
import { socket } from "./socket"

export const sendTextMessage = ({ toUserId, text }: { toUserId: string, text: string }) => {
  const currentUser = store.getState().user?.currentUser
  const textMessage = {
    fromUserId: currentUser.id,
    toUserId,
    text
  } as TextMessageType

  const message = {
    type: MessageType.TextMessage,
    message: textMessage
  } as Message

  socket.send(message)
}

export const sendTypingStatusMessage = ({ toUserId, typing }: { toUserId: string, typing: boolean }) => {
  const currentUser = store.getState().user?.currentUser
  const typingMessage = {
    fromUserId: currentUser.id,
    toUserId,
    typing,
  } as TypingMessageType

  const message = {
    type: MessageType.Typing,
    message: typingMessage
  } as Message

  socket.send(message)
}


