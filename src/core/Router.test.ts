import Router, { Route, Routes } from "./Router.ts";
import Sinon from "sinon";
import { expect } from "chai";
import Block from "./Block.ts";

describe("Router", () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === "function")
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
  };

  global.window.history.forward = () => {
    if (typeof window.onpopstate === "function")
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
  };

  const fakeContent = Sinon.fake.returns(document.createElement("div"));

  beforeEach(() => {
    Sinon.restore();
  });

  const MockBlock = class extends Block {
    getContent = fakeContent;
  };

  it(".use() should return Router instance", () => {
    const result = Router.use(Routes.Index, MockBlock);

    expect(result).to.eq(Router);
  });

  it("Should render index page on application launch", () => {
    const route = Router.getRoute(Routes.Index) as Route;
    const page = Sinon.stub(route, "render");

    Router.start();

    expect(page.calledOnce).to.be.eq(true);
  });

  describe(".back()", () => {
    it("Should render a page on history back", async () => {
      const timer = Sinon.useFakeTimers();
      const route = Router.getRoute(Routes.Index) as Route;
      const page = Sinon.stub(route, "render");

      Router.back();
      await timer.tickAsync(1);

      expect(page.calledOnce).to.be.eq(true);
    });
  });

  describe(".forward()", () => {
    it("Should render a page on history forward", async () => {
      const timer = Sinon.useFakeTimers();
      const route = Router.getRoute(Routes.Index) as Route;
      const page = Sinon.stub(route, "render");

      Router.forward();
      await timer.tickAsync(1);

      expect(page.calledOnce).to.be.eq(true);
    });
  });

  describe(".go()", () => {
    it("Should render a page on .go", () => {
      const route = Routes.Messenger;

      Router.go(route);

      expect(window.location.pathname).to.eq(route);
    });
  });
});
