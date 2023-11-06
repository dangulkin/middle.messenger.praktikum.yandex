import Block from '../../core/Block';
import './button.module.css'

interface ButtonProps {
	name?: string,
	type?: string,
  label: string,
	class?: string,
	disabled?: boolean,
  events?: {
    click: (e:Event) => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
  }

	init(){
		this.setProps(this.props);
	}

	update(status:string = ''){
		if(status)
			this.setProps({disabled: false});
		else 
			this.setProps({disabled: true});

	}

  render() {
    return this.compile('{{label}}', this.props);
  }
}
