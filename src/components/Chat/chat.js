import Handlebars from "handlebars";
import chat from './chat.tmpl';

export const Chat = (props) => {
	return Handlebars.compile(chat)(props)
}