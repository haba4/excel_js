import {DomListener} from '@core/DomListener';

/**
 * Абстрактный компонент, содержащий различные методы. От него наследуются все компоненты страницы Excel
 */
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.unsubscribers = [];
    
    this.prepare();
  }
  
  /**
   * Настраиваем компонент до метода init()
   */
  prepare() {}
  
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
   * Интерфейс для взаимодействия с emitter,
   * уведомляет слушателей про событие event
   * паттерн фассад
   * @param {string} event
   * @param {object} args
   */
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  
  /**
   * Подписываемся на события event
   * @param {string} event
   * @param {function} fun
   */
  $on(event, fun) {
    const unsub = this.emitter.subscribe(event, fun);
    this.unsubscribers.push(unsub);
  }
  
  /**
   * Метод для удаления слушателей из компонента
   */
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
