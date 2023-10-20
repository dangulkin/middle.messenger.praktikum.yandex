import Block from '../../utils/Block';

interface InputProps {
		type: string,
		name?: string,
		value: string,
		pattern: string,
		autocomplete?: string,
		required?: boolean,
		events?:{
			focus?: (e:Event) => void,
			blur?: (e:Event) => void,
			input?: (e:Event) => void,
		}
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', props);
  }

  get isValid() {
		return RegExp(this.props.pattern).test((this.element as HTMLInputElement).value);
  }

	init(){
		this.setProps(this.props);
	}

  render() {
    return this.compile('', this.props);
  }
}
