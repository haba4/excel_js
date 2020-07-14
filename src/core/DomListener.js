import {capitalize} from '@core/utils';

/**
* Класс для добавления и удаления слушателей
*/
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('Нет $root элементов для DomListener!');
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  
  /**
   * Метод для добавления слушателя
   */
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = _getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Метод "${method}" не реализован в компоненте "${this.name || ''}"`);
      }
      // переопределяем метод с привязкой контекста, т.к. контекст отваливается, если
      // пользуемся конструкцией this[method]
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }
  
  /**
   * Метод для удаления слушателя
   */
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = _getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

/**
 * Приватная функция, которая преобразует к примеру: 'input' в 'onInput'
 * @param {string} eventName - на вход получает название эвента, например: 'click'
 * @return {string} - возвращает преобразованный эвент: 'onClick'
 */
function _getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
