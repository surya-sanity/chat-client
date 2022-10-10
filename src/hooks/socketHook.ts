import { userApi } from './../services/userService';
import { UpdateSeenMessageType } from './../models/wsMessage';
import { getSocketConnected } from './../store/reducers/socketReducer';
import { useEffect } from 'react';
import { getToken } from './../store/reducers/tokenReducer';
import { getCurrentUser } from './../store/reducers/userReducer';
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { socket } from '../services/socket';
import { MessageType, ChatMessage, TypingMessageType } from '../models/wsMessage';
import { addChats, setTyping, updateChat } from '../store/reducers/chatReducer';


export const useSocketHook = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const token = useAppSelector(getToken);
  const socketConnected = useAppSelector(getSocketConnected);

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUser && token && !socketConnected) {
      socket.connect()
    } else if ((!currentUser || !token)) {
      socket.disconnect();
    }

  }, [currentUser, token, socketConnected])


  return { socket }
}
