import { GetOnlineStatusMessageType, TypingMessageType, UpdateSeenMessageType } from './../models/wsMessage';
import { Message, MessageType, ChatMessage } from "../models/wsMessage"
import { store } from "../store"
import { socket } from "./socket"
import { nanoid } from '@reduxjs/toolkit';

export const sendTextMessage = ({ toUserId, text }: { toUserId: string, text: string }) => {
  const currentUser = store.getState().user?.currentUser
  const textMessage = {
    messageId: nanoid(20),
    fromUserId: currentUser.id,
    toUserId,
    text,
    dateSent: new Date().toISOString(),
    seen: false,
    sent: false,
  } as ChatMessage

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

export const updateSeenStatusMessage = ({ messageId, toUserId }: { messageId: string, toUserId: string }) => {
  const currentUser = store.getState().user?.currentUser

  const seenMessage = {
    fromUserId: currentUser.id,
    toUserId,
    messageId,
    seen: true,
    dateSeen: new Date().toISOString()
  } as UpdateSeenMessageType

  const message = {
    type: MessageType.UpdateSeen,
    message: seenMessage
  } as Message

  socket.send(message)
}

export const getUserOnlineStatus = (getOnline: GetOnlineStatusMessageType) => {

  const message = {
    type: MessageType.GetOnlineStatus,
    message: getOnline
  } as Message

  socket.send(message)
}