import {$} from '@core/Dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {matrix, nextSelector, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {isCell} from '@/components/table/table.functions';

/**
 * Компонент, содержащий таблицу
 */
export class Table extends ExcelComponent {
  static className = 'excel__table';
  static ROWS_COUNTS = 15;
  
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }
  
  /**
   * Возвращает html отображение страницы
   * @return {string}
   */
  toHTML() {
    return createTable(Table.ROWS_COUNTS);
  }
  
  /**
   * Метод срабатывает при инициализации класса, в конструкторе ExcelComponent
   */
  prepare() {
    this.selection = new TableSelection();
  }
  
  /**
   * Метод задает начальные данные компоненту
   */
  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    
    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:keydown-enter', () => {
      this.selection.current.focus();
    });
  }
  
  /**
   * Нажатие лкм
   * @param {HTMLElement} event
   */
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.ctrlKey) {
        const $cells = matrix(this.selection.current, $target)
          .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }
  
  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
      this.$emit('table:select', $next);
    }
  }
  
  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}