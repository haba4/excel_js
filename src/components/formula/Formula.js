import {ExcelComponent} from '@core/ExcelComponent';

/**
 * Компонент, где вводятся различные математические формулы
 */
export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
    this.$root = $root;
  }
  
  /**
   * Возвращает html отображение страницы
   * @return {string}
   */
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }
  
  /**
   * Метод используется для события 'input' в методе initDOMListeners() класса DomListener
   * @param {object} event
   */
  onInput(event) {
    console.log(this.$root);
    console.log('Formula: onInput', event.target.textContent);
  }
  
  /**
   * Метод используется для события 'click' в методе initDOMListeners() класса DomListener
   * @param {object} event
   */
  onClick(event) {
    console.log('Formula: onClick', event);
  }
}