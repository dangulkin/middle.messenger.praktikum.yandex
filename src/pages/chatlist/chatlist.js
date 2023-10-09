import './chatlist.css';
import Handlebars from 'handlebars';
import tmpl from './chatlist.tmpl';
import {Link} from '../../components/Link/link';
import chat_tmlp from '../../components/Chat/chat.tmpl';

Handlebars.registerPartial('chat', chat_tmlp);

const chatArr = [{
									chatname: 'Jack', 
									text: 'Hi!',
									unread: 1
								},
								{
									chatname: 'Alice', 
									text: 'Изображение',
									unread:0
								},
								{
									chatname: 'Beou', 
									text: 'Let\'s get drunk! 🍻',
									unread:3
								},
								{
									chatname: 'Йохан', 
									text: 'Чо кого?',
									unread:0
								},
								{
									chatname: 'Анжела', 
									text: 'Вечером всё в силе? 😏',
									unread:0
								},
								{
									chatname: 'Some guy from the job', 
									text: 'HB dude! I\'m so happy knowing ya! You are my best buddy ever! Love you bro 💋',
									unread:23
								}
];

export const Chatlist = () => {
	return Handlebars.compile(tmpl)({
		profileLink: Link({
			to: '/profile',
			class: 'goto-profile',
			text: 'Profile'
		}),
		chats: chatArr
	});
}
