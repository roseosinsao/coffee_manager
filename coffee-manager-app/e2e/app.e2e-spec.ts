import { CoffeeManagerAppPage } from './app.po';

describe('coffee-manager-app App', function() {
  let page: CoffeeManagerAppPage;

  beforeEach(() => {
    page = new CoffeeManagerAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
