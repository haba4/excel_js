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
   * Метод геттер-сеттер. Если передаем параметры, он изменяет текс ноды, если вызываем без параметра, возвращает текст,
   * задает textContent элементу
   * @param {string} text - передаем текст
   * @return {string|Dom} - возвращает либо текст, либо инстанс класса DOM, это зависит передали мы параметр или нет.
   */
  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
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
   * Обертка над querySelector
   * @param {string} selector
   * @return {HTMLElement}
   */
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  
  /**
   * Возвращает id из dataset
   * @param {boolean} parsed
   * @return {object}
   */
  id(parsed) {
    if (parsed) {
      const parse = this.id().split(':');
      return {
        row: +parse[0],
        col: +parse[1]
      };
    }
    return this.$el.dataset.id;
  }
  
  /**
   * Задает фокус html элементу
   * @return {Dom}
   */
  focus() {
    this.$el.focus();
    return this;
  }
  
  // eslint-disable-next-line valid-jsdoc
  /**
   * Обертка над classList.add()
   * @param {string} className
   * @return {Dom}
   */
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }
  
  // eslint-disable-next-line valid-jsdoc
  /**
   * Обертка над classList.remove()
   * @param {string} className
   * @return {Dom}
   */
  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
  
  /**
   * Метод задает стили node элементу
   * @param {object} styles - объект стилей в виде ключ-значение. Например {height: '20px', width: '30px'}
   * @return {Dom}
   */
  css(styles = {}) {
    Object.entries(styles).forEach(([key, value]) => {
      this.$el.style[key] = value;
    });
    return this;
  }
}

/**
 * Возвращает инстанс класса Dom
 * @param {HTMLElement} selector
 * @return {Dom}
 */
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