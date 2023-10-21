/* eslint-disable @typescript-eslint/no-unused-vars */
import Handlebars from 'handlebars';
import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';

class Block<P extends Record<string, unknown> = unknown> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  } as const;

	public id = nanoid();
	public children: Record<string, Block[] | Block>;
	private _className: string;
	protected props: P;
	private _tagName: string;
	private eventBus: () => EventBus;
	private _element: HTMLElement | null = null;

	/**
	 * JSDoc
	 * @returns {void}
	 * @param {string} tagName
	 * @param {Object} propsWithChildren
	 */
constructor(tagName: string = "div", propsWithChildren:P) {
	const eventBus = new EventBus();
	const { props, children } = this._getChildrenAndProps(propsWithChildren);
	
	this.children = children;
  this.props = this._makePropsProxy(props);
	this._tagName = tagName.split('.')[0];
	this._className = tagName.split('.')[1];

  this.eventBus = () => eventBus;

  this._registerEvents(eventBus);
  eventBus.emit(Block.EVENTS.INIT);
}

private _getChildrenAndProps(childrenAndProps: P): {props: P, children: Record<string, Block[] | Block>} {
	const props: Record<string, unknown> = {};
	const children: Record<string, Block[] | Block> = {};

	Object.entries(childrenAndProps).forEach(([key, value]) => {
		if (value instanceof Block) {
			children[key as string] = value;
		} else {
			props[key] = value;
		}
	});

	return { props: props as P, children };
}

private _addEvents() {
	const {events = {}} = this.props as P & { events: Record<string, (e:Event) => void> };

	Object.keys(events).forEach(eventName => {
		if(this._element)
			this._element.addEventListener(eventName, events[eventName]);
	});
}

private _registerEvents(eventBus: EventBus) {
  eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
  eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
  eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
}

private _createResources() {
	this._element = this._createDocumentElement(this._tagName);
}

private _init() {
	this._createResources();

	this.init();

	this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
}

protected init() {
  
}

_componentDidMount() {
  this.componentDidMount();
}

// Может переопределять пользователь
protected componentDidMount() {}

public dispatchComponentDidMount() {
	this.eventBus().emit(Block.EVENTS.FLOW_CDM);
}

private _componentDidUpdate(oldProps:P, newProps:P) {
  const response = this.componentDidUpdate(oldProps, newProps);
	if(response)
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
}

// Может переопределять пользователь, необязательно трогать
// eslint-disable-next-line @typescript-eslint/no-unused-vars
protected componentDidUpdate(_oldProps:P, _newProps:P) {
  return true;
}

setProps = (nextProps:P) => {
  if (!nextProps) {
    return;
  }
  Object.assign(this.props, nextProps);
	Object.entries(this.props).forEach(([key, value]) => {
		this.setAttribute(key, value as string);
})
};

get element() {
  return this._element;
}

set className(name:string) {
	this._className = name;
	this.setAttribute('class', this._className);
}

setAttribute = (attr:string, value:unknown) => {
		if(typeof value === 'boolean' ){
			if(value) 
				this.getContent()!.setAttribute(attr, '');
			else 
				this.getContent()!.removeAttribute(attr);
		}else if(attr !== 'events') {
			this.getContent()!.setAttribute(attr, value as string);
		}
}

protected compile(template: string, context: unknown) {
  const contextAndStubs = { ...context };

  Object.entries(this.children).forEach(([name, components]) => {
		const componentsArray = Array.isArray(components) ? components : [components];
			contextAndStubs[name] = '';
      componentsArray.forEach((component, _) => {
				contextAndStubs[name] += `<div data-id="${component.id}"></div>`;
      });
  });
	
  const html = Handlebars.compile(template)(contextAndStubs);
  const temp = document.createElement('template');
  temp.innerHTML = html;
	
  Object.entries(this.children).forEach(([_, components]) => {
		const componentsArray = Array.isArray(components) ? components : [components];

		componentsArray.forEach((component, _) => {
			const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

				if (!stub) 
					return
				
        component.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(component.getContent()!);
      });
  });
	
  return temp.content;
}

private _render() {
  const fragment = this.render();

  this._element!.innerHTML = '';
	this._element!.append(fragment);
	this._addEvents();
}

protected render(): DocumentFragment {
	return new DocumentFragment();
}

//TODO: вынести в компонент
protected form(){
	const form$ = this.getContent()?.querySelector('form') as HTMLFormElement;
	
	if(!form$){
		console.log('На этой странице нет формы ¯\\_(ツ)_/¯');
		return;
	}

	return form$;
}

get formIsValid() {
	const isValid = this.form()?.reportValidity()
	
	if(!isValid) console.log(`*** Form is invalid! ***`);
	
	return isValid;
}

protected logFormData(){
	if(!this.formIsValid)
		return

	const formData = new FormData(this.form());

	if(this.formIsValid) {
		console.log(`\nForm is valid`);
		console.log(`\nForm data`);
		for (const [key, value] of formData) {
			console.log(`${key}: ${value}`);
		}
	}

}
//////////////////////////////////////////////////

getContent() {
  return this.element;
}

_makePropsProxy(props:P) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;

    return new Proxy(props, {
      get(target, prop:string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target }

        target[prop as keyof P] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
}

_createDocumentElement(tagName:string) {
  // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
  const el = 	document.createElement(tagName);
	if(this._className) el.className = this._className;
	return el;
}

show() {
	if(this._element) this._element.style.display = 'block';
}

hide() {
	if(this._element) this._element.style.display = 'none';
}
}

export default Block;
