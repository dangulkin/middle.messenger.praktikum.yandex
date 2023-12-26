/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBus } from '../core/EventBus.ts';
import set from '../utils/set.ts';
import Block from '../core/Block.ts';
import { State } from '../api/interfaces.ts';

enum StorageEvent {
  UpdateState = 'update',
}

class Store extends EventBus {
  private state: State = {};

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);
    this.update();
  }

	update(){
		this.emit(StorageEvent.UpdateState, this.state);
	}
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
  return (Component: typeof Block) => {
    return class extends Component {
      constructor(props: any) {
        super('',{ ...props, ...mapStateToProps(store.getState()) });
        store.on(StorageEvent.UpdateState, () => {
					const propsFromState = mapStateToProps(store.getState());
          this.setProps(propsFromState);
        });
      }
    }
  }
}

export default store;
