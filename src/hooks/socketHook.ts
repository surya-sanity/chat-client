import { getSocketConnected } from './../store/reducers/socketReducer';
import { useEffect } from 'react';
import { getToken } from './../store/reducers/tokenReducer';
import { getCurrentUser } from './../store/reducers/userReducer';
import { useAppSelector } from "../store/hooks"
import { socket } from '../services/socket';
import { MessageType, TextMessageType, TypingMessageType } from '../models/wsMessage';


const addSocketListeners = () => {
  socket.addListener(MessageType.TextMessage, (message) => {
    console.log("Text from server->", ((message.message) as TextMessageType).text);
  })
  socket.addListener(MessageType.Typing, (message) => {
    console.log("Typing", (message.message as TypingMessageType).typing);
  })
}


export const useSocketHook = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const token = useAppSelector(getToken);
  const socketConnected = useAppSelector(getSocketConnected);

  useEffect(() => {
    if (currentUser && token && !socketConnected) {
      socket.connect()
      addSocketListeners()
    } else if ((!currentUser || !token)) {
      socket.disconnect();
    }
  }, [currentUser, token, socketConnected])


  return { socket }
}
