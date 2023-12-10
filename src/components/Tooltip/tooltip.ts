import './tooltip.css';
import Block from '../../core/Block.ts';
import { Button, ButtonProps } from '../Button/button.ts';

interface TooltipProps {
	text?: string,
	buttons?: ButtonProps[],
	events?: {
		click: (e:Event) => void
	}
}

export class Tooltip extends Block {
  constructor(props:TooltipProps) {
    super('div.tooltip', props);
  }

	init(){
		if(this.props.buttons) 
			this.children.buttons = this.props.buttons.map((props:ButtonProps) => {
			return new Button(props);
		});

		this.hide();
	}
	
  render() {
    return this.compile(`
		{{#if text}}
			<p>{{ text }}</p>
		{{/if}}
		{{{ buttons }}}
		`, this.props);
  }
}
