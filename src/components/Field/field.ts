import "./field.css";
import Block from "../../core/Block.ts";
import { Input, InputProps } from "../../components/Input/input.ts";
import tmpl from "./field.tmpl.ts";

export interface FieldProps {
  label?: {
    name?: string;
    text?: string;
    for?: string;
  };
  input?: InputProps;
  error?: string;
}

export class Field extends Block {
  constructor(props: FieldProps) {
    super("label.field", props);
  }

  init() {
    this.children.input = new Input(this.props.input);
  }

  setCustomValidity(error: string) {
    const input = (this.children.input as Block)?.element as HTMLInputElement;
    input.setCustomValidity(error);
  }

  get isValid() {
    return (this.children.input as Input).isValid;
  }

  get input() {
    return this.children.input as Input;
  }

  render() {
    // console.log(this.props);
    return this.compile(tmpl, this.props);
  }
}
