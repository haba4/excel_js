class Dom {
  constructor(selector) {
    // Если selector - строка, то прогоняем ее через querySelector, если dom нода, то сразу присваиваем
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }
  
  /**
   * Метод геттер-сеттер. Если передаем параметры, он изменяет html ноды, если вызываем без параметра, возвращает html
   * @param {string} html - передаем html элемент
   * @return {string|Dom} - возвращает либо html, либо инстанс класса DOM, это зависит передали мы параметр или нет.
   */
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  
  /**
   * Очищает содержимое html
   * @return {Dom} - возвращает инстанс класса Dom
   */
  clear() {
    this.html('');
    return this;
  }
  
  /**
   * Функция задает ноде addEventListener
   * @param {string} eventType - например: клик, движение мыши вниз и т.д.
   * @param {function} callback - функция, которая выполняется при эвенте
   */
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  
  /**
   * Функция задает ноде removeEventListener
   * @param {string} eventType - например: клик, движение мыши вниз и т.д.
   * @param {function} callback - функция, которая выполняется при эвенте
   */
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  
  /**
   * Вставляет ноду после последней дочерней ноды
   * @param {HTMLElement} node
   * @return {Dom} - возвращает инстанс класса Dom
   */
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
  
  /**
   * геттер, возвращает дата-атрибут элемента
   * @return {DOMStringMap}
   */
  get data() {
    return this.$el.dataset;
  }
  
  /**
   * Метод возвращает ближайщего родителя у которого дата-атрибут = selector
   * @param {string} selector - дата-атрибут
   * @return {Dom} - инстанс класса Dom
   */
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  
  /**
   * Получаем координаты дом ноды: высота, ширина, координата х, у...
   * @return {ClientRect | DOMRect}
   */
  getCoordinates() {
    return this.$el.getBoundingClientRect();
  }
  
  /**
   * Обертка над querySelectorAll
   * @param {string} selector
   * @return {HTMLElementTagNameMap}
   */
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  
  /**
   * Метод задает стили node элементу
   * @param {object} styles - объект стилей в виде ключ-значение. Например {height: '20px', width: '30px'}
   */
  css(styles = {}) {
    Object.entries(styles).forEach(([key, value]) => {
      this.$el.style[key] = value;
    });
  }
}

export function $(selector) {
  return new Dom(selector);
}

/**
 * Метод создает HTML element с названием класса
 * @param {string} tagName - название html элемента
 * @param {string} classes - название класса html элемента
 * @return {Dom} - возвращает инстанс класса Dom
 */
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};