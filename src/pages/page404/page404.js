import './page404.css';
import Handlebars from 'handlebars';
import {tmpl} from './page404.tmpl';
import {Link} from '../../components/Link/link';

export const Page404 = () => {
	return Handlebars.compile(tmpl)({
		backToChats: Link({
			text: 'Назад к чатам',
			to: '/chatlist'
		})
	});
}
