import './page500.css';
import {tmpl} from './page500.tmpl';
import {Link} from '../../components/Link/link';
import Block from '../../core/Block';

export class Page500 extends Block {
  constructor() {
    super('div.errorpage', {});
  }

	init() {
		this.children.backToChats = new Link({
				text: 'Назад к чатам',
				to: '/chats',
				events: {
					click: () => { console.log('back to chats') }
				}
			});
	}

  render() {
    return this.compile(tmpl, this.props);
  }
}
