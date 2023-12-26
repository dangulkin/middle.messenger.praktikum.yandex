import './page500.css';
import { tmpl } from './page500.tmpl.ts';
import { Link } from '../../components/Link/link.ts';
import Block from '../../core/Block.ts';
import Router, { Routes } from '../../core/Router.ts';

export class Page500 extends Block {
  constructor() {
    super('div.errorpage', {});
  }

  init() {
    this.children.backToChats = new Link({
      text: 'Назад к чатам',
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
