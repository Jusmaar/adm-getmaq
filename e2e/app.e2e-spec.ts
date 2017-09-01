import { AdminEasymaqPage } from './app.po';

describe('admin-easymaq App', () => {
  let page: AdminEasymaqPage;

  beforeEach(() => {
    page = new AdminEasymaqPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
