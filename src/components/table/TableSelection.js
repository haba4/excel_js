/**
 * Класс для работы с выделениями ячеек
 */

export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }
  
  /**
   * Для выбора ячейки в таблице
   * @param {Dom} $el
   */
  select($el) {
    this.clear();
    $el.focus().addClass('selected');
    this.group.push($el);
    this.current = $el;
  }
  
  /**
   * Вспомогательный метод для удаления выделения ячеек
   */
  clear() {
    this.group.forEach(($el) => {
      $el.removeClass('selected');
    });
    this.group = [];
  }
  
  /**
   * Метод для выделения группы ячеек
   * @param {array} $group
   */
  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => $el.addClass('selected'));
  }
}