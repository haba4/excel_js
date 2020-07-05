import {$} from '@core/Dom';

/**
 * Класс Excel - страница excel
 */
export class Excel {
  /**
   * Получаем id diva из main html и объект, содержащий массив компонентов для страницы Excel
   * @param {string} selector
   * @param {object} options
   */
  constructor(selector, options) {
    this.$exelElement = $(selector);
    this.components = options.components || [];
  }
  
  /**
   * Возвращает корневую ноду для Excel
   * @return {HTMLElement} $root
   */
  getRoot() {
    const $root = $.create('div', 'excel');
    this.components = this.components.map((Component) => {
      const $elem = $.create('div', Component.className);
      const component = new Component($elem);
      // DEBUG
      if (component.name) {
        window['c' + component.name] = component;
      }
      $elem.html(component.toHTML());
      $root.append($elem);
      return component;
    });
    return $root;
  }

  /**
   * Нужен для отрисовки страницы
   */
  render() {
    this.$exelElement.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }
}
