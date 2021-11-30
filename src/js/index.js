import CategoryClass from './CategoryClass.js';
import MoonbucksContentsClass from './MoonbucksContentsClass.js';
import MenuListClass from './MenuListClass.js';
import { domSelector, domSelectorAll } from '../utils/domSelect.js';

class App {
  constructor() {
    this.$app = domSelector('#app');
    this.$categoryArea = domSelector('header nav');
    this.$moonbucksContents = domSelector('main .wrapper');
    this.render();
  }

  render() {
    new CategoryClass({
      target: this.$categoryArea
    })

    new MoonbucksContentsClass({
      target: this.$moonbucksContents
    })

    new MenuListClass()
  }
}

new App();
