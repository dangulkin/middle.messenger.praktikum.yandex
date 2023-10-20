import './field.css';
import Block from '../../utils/Block';
import { Input } from '../../components/Input/input';
import tmpl from './field.tmpl';

interface FieldProps {
	label: {
		name?: string,
		text: string,
	},
	input: {
		type: string,
		name?: string,
		value: string,
		pattern?: string,
		autocomplete?: string,
		disabled?: boolean,
		required?: boolean,
		events?:{
			focus?: (e:Event) => void,
			blur?: (e:Event) => void,
			input?: (e:Event) => void,
		}
	},
	error?: string
}

export class Field extends Block {
  constructor(props: FieldProps) {
    super('label.field', props);
  }

	init() {
		this.children.input = new Input(this.props.input);
	}

	setCustomValidity(error:string){
		const input = ((this.children.input as Block)?.element as HTMLInputElement);
		input.setCustomValidity(error);
	}

  get isValid() {
    return (this.children.input as Input).isValid;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
