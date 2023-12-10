import './feed.css';
import Block from '../../core/Block.ts';
import { Message, MessageProps } from '../Message/message.ts';
import {withStore} from '../../core/Store.ts';
import MessageController from '../../controllers/MessageController.ts';
import { State } from 'src/api/interfaces.ts';

export class BaseFeed extends Block {
  constructor() {
    super('div.feed', {});
  }

	init() {
		
		const date = new Date();
		this.props.date = new Intl.DateTimeFormat("en-EN", {day: 'numeric', month: 'long'}).format(date);
			
		if(this.props.messages)
		
		console.log(this.children.messages);
	}

	protected componentDidMount() {
		console.log('FEED MOUNT');
		// MessageController.updateFeed(this.chatId);
	}

	protected componentDidUpdate(): boolean {
		console.log('FEED UPDATE');
		this.children.messages = this.props.messages.map((props:MessageProps) => {
			return new Message(props)
		});
		return true;
	}

  render() {
    return this.compile(`
			<p class='chat-date'>{{ date }}</p>
			{{{ messages }}}
		`, this.props);
  }
}

function mapStateToProps(state: State) {
	const id = state.chats?.currentChatId;
	let messages:MessageProps[] = [];
	if(state.messages && id ){
		const feed = state.messages[id];
		messages = Array.isArray(feed)
			?	feed.map((props) => {
				const { time, content } = props;
				const className = MessageController.userId === props.user_id ? 'byme' : ''
				return { time, content, class: className };
			})	: [];
	}
  return {
		user: state.user,
		messages: messages
	};
}

export const Feed = withStore(mapStateToProps)(BaseFeed);
