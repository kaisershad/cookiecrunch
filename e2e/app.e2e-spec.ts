import { CookiecrunchPage } from './app.po';

describe('cookiecrunch App', () => {
  let page: CookiecrunchPage;

  beforeEach(() => {
    page = new CookiecrunchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
