import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

/**
 * Компонент, где вводятся различные математические формулы
 */
export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
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
      <div id="formula" class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }
  
  /**
   * Инициализирует компонент
   */
  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text());
    });
    this.$on('table:input', ($cell) => {
      this.$formula.text($cell.text());
    });
  }
  
  /**
   * Метод используется для события 'input' в методе initDOMListeners() класса DomListener
   * @param {object} event
   */
  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }
  
  onKeydown(event) {
    const {key} = event;
    const keys = ['Enter', 'Tab'];
    if (keys.includes(key)) {
      event.preventDefault();
        this.$emit('formula:keydown-enter');
    }
  }
}