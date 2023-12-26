import Block from "../../core/Block.ts";
import "./button.css";
import tmpl from "./button.tmpl.ts";

export interface ButtonProps {
  name?: string;
  type?: string;
  label?: string;
  class?: string;
  disabled?: boolean;
  icon?: boolean;
  events?: {
    click: (e: Event) => void;
  };
}

export class Button extends Block {
  private _itsOn: boolean;

  constructor(props: ButtonProps) {
    super("div", props);
    this._itsOn = false;
  }

  init() {
    this.setProps(this.props);
  }

  update(status: string = "") {
    if (status === "on") {
      this._itsOn = true;
      this.setProps({ disabled: false });
    } else {
      this._itsOn = false;
      this.setProps({ disabled: true });
    }
  }

  get isOn() {
    return this._itsOn;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
