import CategoryClass from './CategoryClass.js';
import MoonbucksContentsClass from './MoonbucksContentsClass.js';
import MenuListClass from './MenuListClass.js';
import { domSelector, domSelectorAll } from '../utils/domSelect.js';
import callApi from '../utils/api.js';

class App {
  constructor() {
    this.$app = domSelector('#app');
    this.$categoryArea = domSelector('header nav');
    this.$moonbucksContents = domSelector('main .wrapper');
    this.category = 'espresso'
    this.render();
    this.getData();
  }

  async getData() {
    const apiData = {
      method: "GET",
      params: `/api/category/${this.category}/menu`
    }
    const result = await callApi(apiData)
    new MoonbucksContentsClass({
      target: this.$moonbucksContents,
      result: result,
    })

    new MenuListClass({
      result: result,
    })
  }

  render() {
    new CategoryClass({
      target: this.$categoryArea
    })

    new MoonbucksContentsClass({
      target: this.$moonbucksContents,
      getData: () => this.getData()
    })

    new MenuListClass({
      getData: () => this.getData()
    })
  }
}

new App();
