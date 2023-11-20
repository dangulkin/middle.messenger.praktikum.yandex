import Block from '../../core/Block';

export interface InputProps {
		type?: string,
		id?: string,
		name?: string,
		placeholder?: string,
		value?: string,
		pattern?: string,
		accept?: string,
		autocomplete?: string,
		required?: boolean,
		disabled?: boolean,
		events?:{
			focus?: (e:Event) => void,
			blur?: (e:Event) => void,
			input?: (e:Event) => void,
			click?: (e:Event) => void,
			change?: (e:Event) => void,
		}
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', props);
  }

  get isValid() {
		return RegExp(this.props.pattern).test((this.element as HTMLInputElement).value);
  }

	public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

	init(){
		Object.entries(this.props).forEach(([key, value]) => {
      this.setAttribute(key, value as string);
    });
	}

  render() {
    return this.compile('', this.props);
  }
}
