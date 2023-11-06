import Block from '../../core/Block';
import tmpl from './chat.tmpl';

interface ChatProps {
  chatname: string,
  text: string,
  unread: number,
  events: {
    click: () => void;
  };
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super('div.chat', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
