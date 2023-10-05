import './page500.css';
import Handlebars from 'handlebars';
import {tmpl} from './page500.tmpl';
import {Link} from '../../components/Link/link';

export const Page500 = () => {
	return Handlebars.compile(tmpl)({
		backToChats: Link({
			text: 'Назад к чатам',
			to: '/chatlist'
		})
	});
}