import Block from '../../core/Block';
import tmpl from './popup.tmpl';
import { Button, ButtonProps } from '../Button/button';
import { Field, FieldProps } from '../Field/field';
// import { ValidationRules } from '../../utils/validationrules';
// import ChatController from '../../controllers/ChatController';

interface PopupProps {
	label?:string, 
	field?:FieldProps, 
	button?:ButtonProps,
	events?: {
		click: (e:Event) => void
	}
}

export class Popup extends Block {
  constructor(props:PopupProps) {
    super('div.popup', props);
  }

	init(){
		this.children.field = new Field({
			...this.props.field
		});

		this.children.button = new Button({
			...this.props.button
		});

		this.hide();
	}
	
  render() {
    return this.compile(tmpl, this.props);
  }
}
