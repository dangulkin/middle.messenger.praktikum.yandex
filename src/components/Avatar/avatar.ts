import Block from '../../core/Block';

export interface ImageProps {
		src?: string,
		id?: string,
		alt?: string,
		width?: string,
		height? : string,
		events?:{
			focus?: (e:Event) => void,
			blur?: (e:Event) => void,
			input?: (e:Event) => void,
			click?: (e:Event) => void,
			change?: (e:Event) => void,
		}
}

export class Avatar extends Block {
  constructor(props: ImageProps) {
    super('img.avatar', props);
  }

	init(){
	}

  render() {
    return this.compile('', this.props);
  }
}
