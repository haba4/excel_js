import {ExcelComponent} from '@core/ExcelComponent';

/**
 * Компонент, содержащий название таблицы и 2 кнопки: для удаления и выхода из таблицы
 */
export class Header extends ExcelComponent {
  static className = 'excel__header';
  
  /**
   * Возвращает html отображение страницы
   * @return {string}
   */
  toHTML() {
    return `
      <input type="text" class="input" value="Новая таблица">
      <div>
          <div class="button">
              <i class="material-icons">delete</i>
          </div>
          <div class="button">
              <i class="material-icons">exit_to_app</i>
          </div>
      </div>
    `;
  }
}