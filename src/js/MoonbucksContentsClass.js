import PubSub from '../utils/observer.js';
import { domSelector } from '../utils/domSelect.js';
import callApi from '../utils/api.js';
import categorys from '../constants/categorys.js';
import MenuListClass from './MenuListClass.js';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage.js';

export default class MoonbucksContentsClass {
  constructor({ target, result }) {
    this.$target = target;
    this.result = result;
    this.currentCategory = 'espresso'
    this.menus = getLocalStorage('espresso')
    this.pubsub = PubSub;
    this.pubsub.sub('currentCategory', this.subHandler, this)
    this.render()
    this.eventHandler()
  }

  async setData(menuName) {
    const apiData = {
      method: "POST",
      params: `/api/category/${this.currentCategory}/menu`,
      data: { name: menuName }
    }
    const result = await callApi(apiData);
    if (result) {
      alert('등록되었습니다.')
    }
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
    this.setData(menuName);
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
    const menuCount = this.result?.length || 0;
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
                  type="submit"
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