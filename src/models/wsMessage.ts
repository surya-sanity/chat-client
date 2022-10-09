export enum MessageType {
  AddUser = 'AddUser',
  TextMessage = 'TextMessage',
  Typing = "Typing",
}

export interface AddUserMessageType {
  userId: string,
}

export interface TextMessageType {
  fromUserId: string
  toUserId: string
  text: string
}

export interface TypingMessageType {
  fromUserId: string
  toUserId: string
  typing: boolean
}

export interface Message {
  type: MessageType
  message: string | AddUserMessageType | TextMessageType | TypingMessageType,
}
