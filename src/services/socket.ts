import io, { Socket } from 'socket.io-client';
import { Config } from '../config';
import { AddUserMessageType, Message, MessageType } from '../models/wsMessage';
import { store } from '../store';
import { setSocketConnected } from '../store/reducers/socketReducer';
import addSocketListeners from './socketListeners';

class SocketClient {

  socket: Socket;
  listeners: { [key: string]: (message: Message) => void } = {}

  constructor(url: string) {
    this.socket = io(url, { autoConnect: false });
  }

  connect() {
    const currentUser = store.getState().user.currentUser
    this.socket.connect();
    this.addUser({ userId: currentUser.id })
    this.socket.on('connect', () => {
      store.dispatch(setSocketConnected(true))
      this._setupListeners()
    })
    this.socket.on('disconnect', () => {
      store.dispatch(setSocketConnected(false))
    })
  }

  disconnect() {
    store.dispatch(setSocketConnected(false))
    this.socket.disconnect()
    this.socket.close();
  }

  _setupListeners() {
    this.socket.on('message', (data) => {
      const message = data as Message

      const callback = this.listeners[message.type]

      if (callback) {
        callback(message)
      } else {
        console.log('No callback for message type: ' + message.type)
      }

    })

    addSocketListeners()
  }

  addListener(key: MessageType, callback: (message: Message) => void) {
    this.listeners[key] = callback
  }

  removeListener(key: MessageType) {
    delete this.listeners[key]
  }

  addUser(message: AddUserMessageType) {
    const addUserMessage = {
      type: MessageType.AddUser,
      message
    } as Message

    this.socket.emit("addUser", addUserMessage);
  }

  send(message: Message) {
    this.socket.emit("message", message);
  }

}

export const socket = new SocketClient(Config.API_URL);