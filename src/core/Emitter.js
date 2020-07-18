export class Emitter {
  constructor() {
    this.listeners = {};
  }
  
  /**
   * Метод уведомляет слушателей о изменениях в компонентах, на которые они подписаны
   * table.emit('table:select', {paramName: 'paramValue'})
   * @param {string} event - название события. Например: 'focus', 'formula:done'
   * @param {object} args
   * @return {boolean}
   */
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }
  
  /**
   * Подписываемся на уведомления или добавляем нового слушателя
   * table.subscribe('table:select', () => {})
   * this.listeners = {
   *   'focus': [fun1, fun2,...],
   * }
   * @param {string} event - название события. Например: 'focus', 'formula:done'
   * @param {function} fun - колл бэк функция
   * @return {function} - позволяет отписаться от слушателя
   */
  subscribe(event, fun) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fun);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => {
        return listener !== fun;
      });
    };
  }
}

// Временно оставил коммент, чтобы не забыть реализацию в коде
// const emitter = new Emitter();
// const unsubVlad = emitter.subscribe('vlad', (data) => console.log('Our data: ', data));
// setTimeout(() => {
//   emitter.emit('vlad', 'After 2 seconds');
// }, 2000);
// setTimeout(() => {
//   unsubVlad();
// }, 3000);
// setTimeout(() => {
//   emitter.emit('vlad', 'After 4 seconds');
// }, 4000);