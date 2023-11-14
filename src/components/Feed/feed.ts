import Block from '../../core/Block';
import { Message, MessageProps } from '../Message/message';

// interface FeedProps {
//   date: string,
//   messages: Message[],
// }

export class Feed extends Block {
  constructor() {
    super('div.feed', {});
  }

	init() {
		const date = new Date();
		this.props.date = new Intl.DateTimeFormat("en-EN", {day: 'numeric', month: 'long'}).format(date);
		this.props.messages = [
			{
				text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. 
				\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
			},
			{
				text: 'Круто!',
				class: 'byme',
			}
		];

		this.children.messages = this.props.messages.map((props:MessageProps) => {
			return new Message(props)
		});
	}

  render() {
    return this.compile(`
			<p class='chat-date'>{{ date }}</p>
			{{{ messages }}}
		`, this.props);
  }
}
