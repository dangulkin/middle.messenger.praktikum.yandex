import { expect } from 'chai';
import sinon from 'sinon';
import { Link } from "./link.ts";

describe('Link component', () => {
  it('Should be clickable', () => {
    const callback = sinon.stub();
    const button = new Link({ text: '123', events: { click: callback }});

    const element = button.element as HTMLElement;

    element.click();

    expect(callback.calledOnce).to.eq(true);
  });
});
