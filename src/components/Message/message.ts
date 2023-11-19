import tmpl from './message.tmpl';
import Block from '../../core/Block';
// import { IMessageData } from '../../api/interfaces';

export interface MessageProps {
	text?: string,
	time?: string,
	class?: string,
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super('div.message', props);
  }

	init() {
		const date = new Date();
		const minutes = date.getMinutes().toString();
		const hours = date.getHours().toString();
		this.props.time = `${hours.padStart(2,'0')}:${minutes.padStart(2,'0')}`;
		
		Object.entries(this.props).forEach(([key, value]) => {
      this.setAttribute(key, value as string);
    });
	}

  render() {
    return this.compile(tmpl, this.props);
  }
}
