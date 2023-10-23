import tmpl from './link.tmpl.js';
import Block from '../../utils/Block';

interface LinkProps {
  to: string,
	class?: string,
	text: string,
  events: {
    click: () => void;
  };
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super('div.link', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
