import { getSocketConnected } from './../store/reducers/socketReducer';
import { useEffect } from 'react';
import { getToken } from './../store/reducers/tokenReducer';
import { getCurrentUser } from './../store/reducers/userReducer';
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { socket } from '../services/socket';
import { MessageType, ChatMessage, TypingMessageType } from '../models/wsMessage';
import { addChats, setTyping } from '../store/reducers/chatReducer';

const addSocketListeners = (dispatch: any) => {
  socket.addListener(MessageType.TextMessage, (message) => {
    const chat = message.message as ChatMessage;
    dispatch(addChats(chat))
  })
  socket.addListener(MessageType.Typing, (message) => {
    const typingMessage = message.message as TypingMessageType

    dispatch(setTyping({ fromUserId: typingMessage.fromUserId, typing: typingMessage.typing }))
  })
}


export const useSocketHook = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const token = useAppSelector(getToken);
  const socketConnected = useAppSelector(getSocketConnected);

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUser && token && !socketConnected) {
      socket.connect()
      addSocketListeners(dispatch)
    } else if ((!currentUser || !token)) {
      socket.disconnect();
    }
  }, [currentUser, token, socketConnected])


  return { socket }
}
