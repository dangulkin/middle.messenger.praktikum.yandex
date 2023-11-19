export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ISignInData {
  login: string;
  password: string;
}

export interface IUserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface IChatData {
	id?: number,
  title?: string,
  avatar?: string,
	time?: string,
	created_by?: number,
  unread_count?: number,
	last_message?: string,
	class?: string
}

export interface IChats {
	list: IChatData[],
	currentChatId: number,
}

export interface IMessageData {
	id: string,
	time: string,
	user_id: string,
	content: string,
	type: string
}

export interface State {
  user?: IUserData,
	chats?: {
		list: IChatData[],
		currentChatId: number
	},
	messages?: IMessageData[]
}
