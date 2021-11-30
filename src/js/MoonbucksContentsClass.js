import PubSub from '../utils/observer.js';
import { domSelector } from '../utils/domSelect.js';
import categorys from '../constants/categorys.js';
import MenuListClass from './MenuListClass.js';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage.js';

export default class MoonbucksContentsClass {
  constructor({ target }) {
    this.$target = target;
    this.currentCategory = 'espresso'
    this.menus = getLocalStorage('espresso')
    this.pubsub = PubSub;
    this.pubsub.sub('currentCategory', this.subHandler, this)
    this.render()
    this.eventHandler()
  }

  subHandler(category) {
    this.currentCategory = category
    this.menus = getLocalStorage(category) || [];
    this.render()
    this.eventHandler()
  }

  submit(e) {
    e.preventDefault();
    const $menuInput = domSelector('#espresso-menu-name');
    const menuName = $menuInput.value
    this.menus.push(menuName)
    setLocalStorage(this.currentCategory, this.menus)
    this.pubsub.pub('currentCategory', this.currentCategory)
    if (menuName) {
      $menuInput.value = ''
    }
  }


  eventHandler() {
    const $menuInputForm = domSelector('#espresso-menu-form');
    $menuInputForm.addEventListener('submit', (e) => this.submit(e));
  }

  render() {
    const selectCategory = categorys.find(obj => obj.category === this.currentCategory);
    const pureName = selectCategory.name.split(' ')[1]
    const menuCount = getLocalStorage(this.currentCategory)?.length || 0;
    this.$target.innerHTML = `
      <div class="heading d-flex justify-between">
        <h2 class="mt-1">${selectCategory.name} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${menuCount}개</span>
      </div>
      <form id="espresso-menu-form">
        <div class="d-flex w-100">
          <label for="espresso-menu-name" class="input-label" hidden>
            ${pureName} 메뉴 이름
          </label>
          <input
                  type="text"
                  id="espresso-menu-name"
                  name="espressoMenuName"
                  class="input-field"
                  placeholder="${pureName} 메뉴 이름"
                  autocomplete="off"
          />
          <button
                  type="button"
                  name="submit"
                  id="espresso-menu-submit-button"
                  class="input-submit bg-green-600 ml-2"
          >
            확인
          </button>
        </div>
      </form>
      <ul id="espresso-menu-list" class="mt-3 pl-0"></ul>
    `
  }
}