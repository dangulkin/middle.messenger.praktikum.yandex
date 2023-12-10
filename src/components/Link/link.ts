import './link.css';
import tmpl from './link.tmpl.ts';
import Block from '../../core/Block.ts';

interface LinkProps {
  to?: string,
	class?: string,
	text?: string,
  events?: {
    click: (e:Event) => void;
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
