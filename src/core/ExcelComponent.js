import {DomListener} from '@core/DomListener';

/**
 * Абстрактный компонент, содержащий различные методы. От него наследуются все компоненты страницы Excel
 */
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
  }
  
  /**
   * метод возвращает html шаблон компонента
   * @return {string} - возвращает html шаблон
   */
  toHTML() {
    return 'return toHTML';
  }
  
  /**
   * Метод для добавления слушателей к компоненту
   */
  init() {
    this.initDOMListeners();
  }
  
  /**
   * Метод для удаления слушателей из компонента
   */
  destroy() {
    this.removeDOMListeners();
  }
}
