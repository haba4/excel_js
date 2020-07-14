import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

/**
 * Компонент, содержащий таблицу
 */
export class Table extends ExcelComponent {
  static className = 'excel__table';
  
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }
  
  /**
   * Возвращает html отображение страницы
   * @return {string}
   */
  toHTML() {
    return createTable(15);
  }
  
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}