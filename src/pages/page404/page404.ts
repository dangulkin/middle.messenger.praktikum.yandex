import "./page404.css";
import { tmpl } from "./page404.tmpl.ts";
import { Link } from "../../components/Link/link.ts";
import Block from "../../core/Block.ts";
import Router, { Routes } from "../../core/Router.ts";

export class Page404 extends Block {
  constructor() {
    super("div.notfound", {});
  }

  init() {
    this.children.backToChats = new Link({
      text: "Назад к чатам",
      events: {
        click: () => {
          Router.go(Routes.Messenger);
        },
      },
    });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
