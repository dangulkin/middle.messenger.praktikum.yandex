import './page404.css';
import {tmpl} from './page404.tmpl';
import {Link} from '../../components/Link/link';
import Block from '../../utils/Block';


export class Page404 extends Block {
  constructor() {
    super('div.notfound', {});
  }

	init() {
		this.children.backToChats = new Link({
				text: 'Назад к чатам',
				to: '/chatlist',
				events: {
					click: () => { console.log('back to chats') }
				}
			});
	}

  render() {
		console.log('Page 404 compile');
    return this.compile(tmpl, this.props);
  }
}
