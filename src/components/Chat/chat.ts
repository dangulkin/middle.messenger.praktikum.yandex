import Block from '../../core/Block';
import tmpl from './chat.tmpl';

interface ChatItemProps {
  chatname: string,
  text: string,
  unread: number,
  events: {
    click: () => void;
  };
}

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super('div.chat', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
