/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Handlebars from "handlebars";
import { EventBus } from "./EventBus.ts";
import { nanoid } from "nanoid";
import { isEmpty } from "../utils/isempty.ts";

export type BlockType<P extends Record<string, unknown> = any> = {
  new (props: P): Block<P>;
};

class Block<P extends Record<string, unknown> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  public id = nanoid();
  public children: Record<string, Block[] | Block>;
  private _className: string;
  protected props: P;
  private _tagName: string;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _form: HTMLFormElement | null = null;
  private _visible: boolean = true;

  private _meta: { oldProps: P };

  /**
   * JSDoc
   * @returns {void}
   * @param {string} tagName
   * @param {Object} propsWithChildren
   */
  constructor(tagName: string = "div", propsWithChildren: P) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      oldProps: {} as P,
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this._tagName = tagName.split(".")[0] || tagName;
    this._className = tagName.split(".")[1] || "";

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: P): {
    props: P;
    children: Record<string, Block[] | Block>;
  } {
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
    const { events = {} } = this.props as P & {
      events?: Record<string, (e: Event) => void>;
    };

    Object.keys(events).forEach((eventName) => {
      if (this._element && events[eventName]) {
        this._element.addEventListener(
          eventName,
          events[eventName] as EventListener,
        );
      }
    });
  }

  private _removeEvents() {
    const { events = {} } = this._meta.oldProps as P & {
      events?: Record<string, (e: Event) => void>;
    };

    Object.keys(events).forEach((eventName) => {
      if (this._element && events[eventName]) {
        this._element.removeEventListener(
          eventName,
          events[eventName] as EventListener,
        );
      }
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

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь
  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    //console.log('Block mount');
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    // Object.values(this.children).forEach(child => (child as Block).dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this._meta.oldProps, this.props);
    Object.assign(this.props, nextProps);
    Object.entries(this.props).forEach(([key, value]) => {
      if (key === "src")
        console.log(this._element, this._element?.hasAttribute(key));
      if (this._element?.hasAttribute(key) && typeof value !== "object")
        this.setAttribute(key, value as string);
    });

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, this._meta.oldProps, nextProps);
  };

  get element() {
    return this._element;
  }

  set className(name: string) {
    this._className = name;
    this.setAttribute("class", this._className);
  }

  setAttribute = (attr: string, value: string) => {
    // if(this._element?.hasAttribute(attr)){
    if (attr == "class") {
      this.addClass(value);
      return;
    }

    if (typeof value === "boolean") {
      if (value) this.getContent()!.setAttribute(attr, "");
      else this.getContent()!.removeAttribute(attr);
    } else if (attr !== "events") {
      this.getContent()!.setAttribute(attr, value);
    }
    // }
  };

  protected compile(template: string, context: object) {
    const contextAndStubs = { ...context } as { [key: string]: string };

    Object.entries(this.children).forEach(([name, components]) => {
      const componentsArray = Array.isArray(components)
        ? components
        : [components];
      contextAndStubs[name] = "";
      componentsArray.forEach((component, _) => {
        contextAndStubs[name] += `<div data-id="${component.id}"></div>`;
      });
    });

    const html = Handlebars.compile(template)(contextAndStubs);
    const temp = document.createElement("template");
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, components]) => {
      const componentsArray = Array.isArray(components)
        ? components
        : [components];

      componentsArray.forEach((component, _) => {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

        if (!stub) return;

        component.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(component.getContent()!);
      });
    });

    return temp.content;
  }

  private _render() {
    const fragment = this.render();

    if (!isEmpty(this._meta.oldProps)) this._removeEvents();

    this._element!.innerHTML = "";
    this._element!.append(fragment);

    this._form = this.getContent()?.querySelector("form") as HTMLFormElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  //TODO: вынести в компонент
  protected form() {
    if (!this._form) {
      console.log("На этой странице нет формы ¯\\_(ツ)_/¯");
      return;
    }

    return this._form;
  }

  get formIsValid() {
    const isValid = this.form()?.reportValidity();

    if (!isValid) console.log(`*** Form is invalid! ***`);

    return isValid;
  }

  get formData() {
    return this._form ? new FormData(this._form) : null;
  }

  protected logFormData() {
    if (!this.formIsValid) {
      return;
    }

    if (this.formIsValid) {
      console.log(`\nForm is valid`);
      console.log(`\nForm data`);

      this.formData?.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    }
  }

  //////////////////////////////////////////////////

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        // const oldTarget = { ...target };

        target[prop as keyof P] = value;

        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const el = document.createElement(tagName);
    if (this._className) {
      el.classList.add(this._className);
    }
    return el;
  }

  show() {
    if (this._element) this._element.style.visibility = "visible";
    this._visible = true;
  }

  hide() {
    if (this._element) this._element.style.visibility = "hidden";
    this._visible = false;
  }

  get isVisible() {
    return this._visible;
  }

  addClass(value: string) {
    this.getContent()!.classList.add(value);
  }

  removeClass(value: string) {
    this.getContent()!.classList.remove(value);
  }
}

export default Block;
