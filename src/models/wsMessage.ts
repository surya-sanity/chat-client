export enum MessageType {
  AddUser = 'AddUser',
  TextMessage = 'TextMessage',
  Typing = "Typing",
  UpdateSeen = "UpdateSeen",
  ProfileUpdate = "ProfileUpdate",
  GetOnlineStatus = "GetOnlineStatus",
  UserOnlineStatus = "UserOnlineStatus"
}

export interface AddUserMessageType {
  userId: string,
}

export interface ChatMessage {
  messageId: string
  fromUserId: string
  toUserId: string
  text: string
  sent: boolean
  seen: boolean
  dateSent: string
  dateSeen: string
}

export interface TypingMessageType {
  fromUserId: string
  toUserId: string
  typing: boolean
}

export interface UpdateSeenMessageType {
  fromUserId: string,
  toUserId: string,
  messageId: string,
  seen: boolean,
  dateSeen: string
}

export interface GetOnlineStatusMessageType {
  userId: string,
  fromUserId: string,
}
export interface UserOnlineStatusMessageType {
  userId: string,
  isOnline: boolean
}

export interface Message {
  type: MessageType
  message: string
  | boolean
  | AddUserMessageType
  | ChatMessage
  | TypingMessageType
  | UpdateSeenMessageType
  | GetOnlineStatusMessageType
  | UserOnlineStatusMessageType,
}
