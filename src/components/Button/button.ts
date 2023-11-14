import Block from '../../core/Block';
import './button.module.css'

export interface ButtonProps {
	name?: string,
	type?: string,
  label?: string,
	class?: string,
	disabled?: boolean,
  events?: {
    click: (e:Event) => void;
  };
}

export class Button extends Block {
	private _itsOn : boolean;

  constructor(props: ButtonProps) {
    super('button', props);
		this._itsOn = false;
  }

	init(){
		this.setProps(this.props);
	}

	update(status:string = ''){
		if(status === 'on'){
			this._itsOn = true;
			this.setProps({disabled: false});
		}
		else {
			this._itsOn = false;
			this.setProps({disabled: true});
		}

	}

	get isOn(){
		return this._itsOn;
	}

  render() {
    return this.compile('{{label}}', this.props);
  }
}
