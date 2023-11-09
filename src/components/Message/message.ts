import tmpl from './message.tmpl';
import Block from '../../core/Block';

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
		this.props.time = date.getHours() + ':' + date.getMinutes();
		
		Object.entries(this.props).forEach(([key, value]) => {
      this.setAttribute(key, value as string);
    });
	}

  render() {
    return this.compile(tmpl, this.props);
  }
}
