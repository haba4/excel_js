import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

/**
 * Компонент, содержащий таблицу
 */
export class Table extends ExcelComponent {
  static className = 'excel__table';
  
  /**
   * Возвращает html отображение страницы
   * @return {string}
   */
  toHTML() {
    return createTable(20);
  }
}