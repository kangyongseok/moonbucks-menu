import PubSub from '../utils/observer.js';
import { domSelector, domSelectorAll } from '../utils/domSelect.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js'
import callApi from '../utils/api.js';

export default class MenuListClass {
  constructor(props) {
    this.menus = props?.result || []
    this.getData = props?.getData
    this.category = 'espresso'
    // this.getData()
    this.render()
    this.eventHandler()
    this.pubsub = PubSub;
    this.pubsub.sub('currentCategory', this.subHandler, this)
  }

  // async getData() {
  //   const apiData = {
  //     method: "GET",
  //     params: `/api/category/${this.category}/menu`
  //   }
  //   const result = await callApi(apiData)
  //   this.menus = result
  //   this.render()
  // }

  subHandler(category) {
    this.category = category
    // this.getData()
    this.render()
    this.eventHandler()
  }

  eventHandler() {
    const menuItems = domSelectorAll('.menu-list-item');
    menuItems.forEach((item, i) => this.setEvent(item, i))
  }

  menuListUpdate() {
    setLocalStorage(this.category, this.menus)
    this.pubsub.pub('currentCategory', this.category)
    this.render()
  }

  soldOutMenu(item) {
    item.children[0].classList.toggle('sold-out')
  }

  deleteMenu(i) {
    const userAnswer = confirm('정말 삭제하시겠습니까?');
    if (userAnswer) {
      this.menus.splice(i, 1);
      this.menuListUpdate()
    }
  }

  modifyMenu(i) {
    const modifyValue = prompt('메뉴명을 수정하세요', this.menus[i]);
    if (modifyValue) {
      this.menus[i] = modifyValue;
      this.menuListUpdate()
    }
  }

  setEvent(item, i) {
    item.addEventListener('click', (e) => {
      const targetBtnText = e.target.innerText
      switch (targetBtnText) {
        case '품절': this.soldOutMenu(item)
          break;
        case '수정': this.modifyMenu(i)
          break;
        case '삭제': this.deleteMenu(i)
          break;
        default: break;
      }
    })
  }

  render() {
    const ul = domSelector('#espresso-menu-list')
    const $menuListItem = (name) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>
    `
    }
    ul.innerHTML = this.menus.map(obj => $menuListItem(obj.name)).join('')
  }
}